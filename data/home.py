import pandas as pd
from dotenv import load_dotenv
import duckdb
import os
from collections import Counter

load_dotenv()

token = os.getenv("MOTHERDUCK_TOKEN")
if not token:
    raise RuntimeError("MOTHERDUCK_TOKEN is missing from .env")

os.environ["motherduck_token"] = token
con = duckdb.connect("md:")

try:
    # Fetch global metrics:
    metrics = con.sql("""
        SELECT
            (SELECT COUNT(DISTINCT skuId) FROM sephora_dev.staging.stg_products
            WHERE skuId IS NOT NULL) AS total_products,

            (SELECT COUNT(DISTINCT ReviewText) FROM sephora_dev.staging.stg_reviews
            WHERE CID IS NOT NULL) AS total_reviews,

            (SELECT COUNT(DISTINCT CID) FROM sephora_dev.staging.stg_reviews)
            AS total_customers
    """).df().iloc[0]

    # Fetch each category distribution
    cat1_df = con.sql("""
        SELECT Category1, COUNT(*) AS total
        FROM sephora_dev.staging.stg_products
        WHERE Category1 IS NOT NULL
        GROUP BY Category1
        ORDER BY total DESC
    """).df()

    cat2_df = con.sql("""
        SELECT Category2, COUNT(*) AS total
        FROM sephora_dev.staging.stg_products
        WHERE Category2 IS NOT NULL
        GROUP BY Category2
        ORDER BY total DESC
    """).df()

    cat3_df = con.sql("""
        SELECT Category3, COUNT(*) AS total
        FROM sephora_dev.staging.stg_products
        WHERE Category3 IS NOT NULL
        GROUP BY Category3
        ORDER BY total DESC
    """).df()


    df_brand_cat = con.sql("""
        WITH brand_reviews AS (
            SELECT 'Category1' AS category_level,
                Category1 AS category,
                brand,
                SUM(reviews) AS reviews
            FROM sephora_dev.staging.stg_products
            WHERE Category1 IS NOT NULL AND brand IS NOT NULL
            GROUP BY Category1, brand

            UNION ALL

            SELECT 'Category2', Category2, brand, SUM(reviews)
            FROM sephora_dev.staging.stg_products
            WHERE Category2 IS NOT NULL AND brand IS NOT NULL
            GROUP BY Category2, brand

            UNION ALL

            SELECT 'Category3', Category3, brand, SUM(reviews)
            FROM sephora_dev.staging.stg_products
            WHERE Category3 IS NOT NULL AND brand IS NOT NULL
            GROUP BY Category3, brand
        ),
        ranked AS (
            SELECT *,
                ROW_NUMBER() OVER (
                    PARTITION BY category_level, category
                    ORDER BY reviews DESC, brand ASC
                ) AS rn
            FROM brand_reviews
        )
        SELECT category_level, category, brand, reviews
        FROM ranked
        WHERE rn <= 10
        ORDER BY category_level, category, reviews DESC
    """).df()

    df_ratings = con.sql("""
        SELECT
            'Category1' AS category_level,
            Category1 AS category,
            ROUND(MEDIAN(rating), 2) AS median_rating
        FROM sephora_dev.staging.stg_products
        WHERE Category1 IS NOT NULL
        GROUP BY Category1

        UNION ALL

        SELECT
            'Category2',
            Category2,
            ROUND(MEDIAN(rating), 2)
        FROM sephora_dev.staging.stg_products
        WHERE Category2 IS NOT NULL
        GROUP BY Category2

        UNION ALL

        SELECT
            'Category3',
            Category3,
            ROUND(MEDIAN(rating), 2)
        FROM sephora_dev.staging.stg_products
        WHERE Category3 IS NOT NULL
        GROUP BY Category3

        ORDER BY category_level, median_rating DESC
    """).df()

    df_top_brands = con.sql("""
        SELECT
            brand,
            COUNT(*) AS total
        FROM sephora_dev.staging.stg_products
        WHERE brand IS NOT NULL
        GROUP BY brand
        ORDER BY total DESC
        LIMIT 10
    """).df()

    df_top_reviews = con.sql("""
        SELECT 
            brand, 
            SUM(reviews) AS total_reviews 
        FROM sephora_dev.staging.stg_products
        WHERE brand IS NOT NULL 
        GROUP BY 1 
        ORDER BY 2 DESC
        LIMIT 10
    """).df()

    df_top_price = con.sql("""
        SELECT 
            brand, 
            ROUND(median(listPrice), 2) AS median_price 
        FROM sephora_dev.staging.stg_products 
        GROUP BY 1 
        ORDER BY 2 DESC
        LIMIT 10
    """).df()

    df_top_brand_rating = con.sql("""
        SELECT 
        brandName, 
        ROUND(median(Rating), 2) AS median_rating 
        FROM sephora_dev.staging.stg_products
        WHERE brandName IS NOT NULL 
        GROUP BY 1 
        ORDER BY 2 DESC
        LIMIT 10
    """).df()

    df_brands = con.sql("""
        SELECT 
            brand, 
            COUNT(*) AS total,
            SUM(reviews) AS total_reviews,
            ROUND(median(listPrice), 2) AS median_price
        FROM sephora_dev.staging.stg_products
        WHERE brand IS NOT NULL
        GROUP BY 1 
        ORDER BY 2 DESC
    """).df()

    df_eye_color = con.sql("""
        SELECT eyeColor, total
        FROM sephora_dev.analytics.fct_reviews_eye_color
        WHERE eyeColor IS NOT NULL
        AND eyeColor <> 'UNDEFINED'
        ORDER BY eyeColor
    """).df()

    df_age = con.sql("""
            SELECT age, total
            FROM sephora_dev.analytics.fct_reviews_age
            WHERE age IS NOT NULL
            AND age <> 'UNDEFINED'

    """).df()

    df_hair = con.sql("""
            SELECT hairCondition, total
            FROM sephora_dev.analytics.fct_reviews_hair
            WHERE hairCondition IS NOT NULL
            AND hairCondition <> 'UNDEFINED'
            ORDER BY hairCondition
    """).df()

    df_skin_tone = con.sql("""
            SELECT skinTone, total
            FROM sephora_dev.analytics.fct_reviews_skin_tone
            WHERE skinTone IS NOT NULL
            AND skinTone <> 'UNDEFINED'
            ORDER BY skinTone
    """).df()

    df_skin_type = con.sql("""
            SELECT skinType, total
            FROM sephora_dev.analytics.fct_reviews_skin_type
            WHERE skinType IS NOT NULL
            AND skinType NOT IN ('UNDEFINED', 'Undefined')
            ORDER BY skinType
    """).df()

    df_radar = con.sql("""
            SELECT
                *
            FROM
                sephora_dev.analytics.fct_client_segments_data
    """).df()

    #heatmap1 data:
    df_heatmap1 = con.sql("""
        WITH brand_reviews AS (
            SELECT
                brandName,
                isNew,
                SUM(reviews) AS total_reviews
            FROM sephora_dev.staging.stg_products
            WHERE brandName IS NOT NULL
            AND isNew IS NOT NULL
            GROUP BY brandName, isNew
        ),

        top_new_brands AS (
            SELECT
                brandName,
                total_reviews AS new_reviews
            FROM brand_reviews
            WHERE isNew = TRUE
            ORDER BY new_reviews DESC, brandName
            LIMIT 10
        )

        SELECT
            t.brandName,
            COALESCE(o.total_reviews, 0) AS old_reviews,
            t.new_reviews
        FROM top_new_brands t
        LEFT JOIN brand_reviews o
            ON o.brandName = t.brandName
        AND o.isNew = FALSE
        ORDER BY t.new_reviews DESC, t.brandName
    """).df()
    brands_rev = df_heatmap1['brandName'].tolist()
    data_old = df_heatmap1['old_reviews'].to_list()
    data_new = df_heatmap1['new_reviews'].to_list()

    #Heatmap2 data:
    df_heatmap2 = con.sql("""
        WITH brand_ratings AS (
            SELECT
                brandName,
                isNew,
                ROUND(MEDIAN(rating), 2) AS median_rating
            FROM sephora_dev.staging.stg_products
            WHERE brandName IS NOT NULL
            AND isNew IS NOT NULL
            AND rating IS NOT NULL
            GROUP BY brandName, isNew
        ),

        top_new_brands AS (
            SELECT
                brandName,
                median_rating AS new_rating
            FROM brand_ratings
            WHERE isNew = TRUE
            ORDER BY new_rating DESC, brandName
            LIMIT 10
        )

        SELECT
            t.brandName,
            o.median_rating AS old_rating,
            t.new_rating
        FROM top_new_brands t
        LEFT JOIN brand_ratings o
            ON o.brandName = t.brandName
        AND o.isNew = FALSE
        ORDER BY t.new_rating DESC, t.brandName;
    """).df()
    brands = df_heatmap2['brandName'].tolist()
    data_old_rating = df_heatmap2['old_rating'].tolist()
    data_new_rating = df_heatmap2['new_rating'].tolist()



    global_data = {
        'global_data' : {
            'total_products': "{:,d}".format(metrics['total_products']),
            'total_reviews': "{:,d}".format(metrics['total_reviews']),
            'total_customers': "{:,d}".format(metrics['total_customers'])
        },
        'table_data' :{
            'tab_cat1':{
                'labels': cat1_df.sort_values('total',ascending=False).Category1.tolist(),
                'values': cat1_df.sort_values('total',ascending=False).total.tolist()
            },
            'tab_cat2':{
                'labels': cat2_df.sort_values('total',ascending=False).Category2.tolist(),
                'values': cat2_df.sort_values('total',ascending=False).total.tolist()
            },
            'tab_cat3':{
                'labels': cat3_df.sort_values('total',ascending=False).Category3.tolist(),
                'values': cat3_df.sort_values('total',ascending=False).total.tolist()
            },
            'tab_brand_cat1':{
                'labels1': df_brand_cat[df_brand_cat['category_level'] == "Category1"]["category"].to_list(),
                'labels2': df_brand_cat[df_brand_cat['category_level'] == "Category1"]["brand"].to_list(),
                'values': df_brand_cat[df_brand_cat['category_level'] == "Category1"]["reviews"].astype(int).to_list(),
                'category_counts': dict(Counter(df_brand_cat[df_brand_cat['category_level'] == "Category1"]["category"]))
            },
            'tab_brand_cat2':{
                'labels1': df_brand_cat[df_brand_cat['category_level'] == "Category2"]["category"].to_list(),
                'labels2': df_brand_cat[df_brand_cat['category_level'] == "Category2"]["brand"].to_list(),
                'values': df_brand_cat[df_brand_cat['category_level'] == "Category2"]["reviews"].astype(int).to_list(),
                'category_counts': dict(Counter(df_brand_cat[df_brand_cat['category_level'] == "Category2"]["category"]))
            },
            'tab_brand_cat3':{
                'labels1': df_brand_cat[df_brand_cat['category_level'] == "Category3"]["category"].to_list(),
                'labels2': df_brand_cat[df_brand_cat['category_level'] == "Category3"]["brand"].to_list(),
                'values': df_brand_cat[df_brand_cat['category_level'] == "Category3"]["reviews"].astype(int).to_list(),
                'category_counts': dict(Counter(df_brand_cat[df_brand_cat['category_level'] == "Category3"]["category"]))
            },
            'tab-rating-1':{
                'labels': df_ratings[df_ratings['category_level'] == 'Category1']['category'].tolist(),
                'values': df_ratings[df_ratings['category_level'] == 'Category1']['median_rating'].tolist()
            },
            'tab-rating-2':{
                'labels': df_ratings[df_ratings['category_level'] == 'Category2']['category'].tolist(),
                'values': df_ratings[df_ratings['category_level'] == 'Category2']['median_rating'].tolist()
            },
            'tab-rating-3':{
                'labels': df_ratings[df_ratings['category_level'] == 'Category3']['category'].tolist(),
                'values': df_ratings[df_ratings['category_level'] == 'Category3']['median_rating'].tolist()
            },
            'tab-top-brand1':{
                'labels': df_brands['brand'].tolist(),
                'values': df_brands['total'].tolist()
            },
            'tab-top-brand2':{
                'labels': df_brands['brand'].tolist(),
                'values': df_brands['total_reviews'].tolist()
            },
            'tab-top-price':{
                'labels': df_brands['brand'].tolist(),
                'values': df_brands['median_price'].tolist()
            },
            'tab-top-rating':{
                'labels': con.sql('SELECT brandName, ROUND(median(Rating), 2) AS median_rating FROM sephora_dev.staging.stg_products GROUP BY 1 ORDER BY 2 DESC;').df()['brandName'].tolist(),
                'values': con.sql('SELECT brandName, ROUND(median(Rating), 2) AS median_rating FROM sephora_dev.staging.stg_products GROUP BY 1 ORDER BY 2 DESC;').df()['median_rating'].tolist()
            },
            'tab-customer-1':{
                'labels': df_eye_color.sort_values('total', ascending=False)['eyeColor'].tolist(),
                'values': df_eye_color.sort_values('total', ascending=False)['total'].tolist()
            },
            'tab-customer-2':{
                'labels': df_age.sort_values('total', ascending=False)['age'].tolist(),
                'values': df_age.sort_values('total', ascending=False)['total'].tolist()
            },
            'tab-customer-3':{
                'labels': df_hair.sort_values('total', ascending=False)['hairCondition'].tolist(),
                'values': df_hair.sort_values('total', ascending=False)['total'].tolist()
            },
            'tab-customer-4':{
                'labels': df_skin_tone.sort_values('total', ascending=False)['skinTone'].tolist(),
                'values': df_skin_tone.sort_values('total', ascending=False)['total'].tolist()
            },
            'tab-customer-5':{
                'labels': df_skin_type.sort_values('total', ascending=False)['skinType'].tolist(),
                'values': df_skin_type.sort_values('total', ascending=False)['total'].tolist()
            }
        },
        'chart_data' : {
            'chart1' : {
                'type': 'bar',
                'label': '',
                'labels': cat1_df.sort_values('total',ascending=False).Category1.tolist(),
                'values': cat1_df.sort_values('total',ascending=False).total.tolist()
            },
            'chart2' : {
                'type': 'bar',
                'label': '',
                'labels': cat2_df.sort_values('total',ascending=False).Category2.tolist()[:6],
                'values': cat2_df.sort_values('total',ascending=False).total.tolist()[:6]
            },
            'chart3' : {
                'type': 'bar',
                'label': 'chart 3',
                'labels': cat3_df.sort_values('total',ascending=False).Category3.tolist()[:6],
                'values': cat3_df.sort_values('total',ascending=False).total.tolist()[:6]
            },
            'chart4': {
                'type': 'doughnut',
                'label': 'chart 4',
                'labels': df_brand_cat[df_brand_cat['category_level'] == 'Category1'].groupby('category')['reviews'].sum().sort_values(ascending=False).index.tolist(),
                'values': df_brand_cat[df_brand_cat['category_level'] == 'Category1'].groupby('category')['reviews'].sum().sort_values(ascending=False).values.tolist()
            },
            'chart5': {
                'type': 'doughnut',
                'label': 'chart 5',
                'labels': df_brand_cat[df_brand_cat['category_level'] == 'Category2'].groupby('category')['reviews'].sum().sort_values(ascending=False).index.tolist()[:5],
                'values': df_brand_cat[df_brand_cat['category_level'] == 'Category2'].groupby('category')['reviews'].sum().sort_values(ascending=False).values.tolist()[:5]
            },
            'chart6': {
                'type': 'doughnut',
                'label': 'chart 6',
                'labels': df_brand_cat[df_brand_cat['category_level'] == 'Category3'].groupby('category')['reviews'].sum().sort_values(ascending=False).index.tolist()[:5],
                'values': df_brand_cat[df_brand_cat['category_level'] == 'Category3'].groupby('category')['reviews'].sum().sort_values(ascending=False).values.tolist()[:5]
            },
            'chart7':{
                'Category1': {
                    'type': 'radar',
                    'label': '',
                    'labels': df_ratings[df_ratings['category_level'] == 'Category1']['category'].tolist(),
                    'values': df_ratings[df_ratings['category_level'] == 'Category1']['median_rating'].tolist()
                },
                'Category2': {
                    'type': 'radar',
                    'label': '',
                    'labels': df_ratings[df_ratings['category_level'] == 'Category2']['category'].tolist()[:6],
                    'values': df_ratings[df_ratings['category_level'] == 'Category2']['median_rating'].tolist()[:6]
                },
                'Category3': {
                    'type': 'radar',
                    'label': '',
                    'labels': df_ratings[df_ratings['category_level'] == 'Category3']['category'].tolist()[:6],
                    'values': df_ratings[df_ratings['category_level'] == 'Category3']['median_rating'].tolist()[:6]
                } 
            },
            'chart8' : {
                'type': 'bar',
                'label': '',
                "labels": df_top_brands["brand"].tolist(),
                "values": df_top_brands["total"].tolist()
            },
            'chart9' : {
                'type': 'bar',
                'label': '',
                'labels': df_top_reviews['brand'].tolist(),
                'values': df_top_reviews['total_reviews'].tolist()
            },
            'chart10': {
                'type': 'bar',
                'label': '',
                'labels': df_top_price['brand'].tolist(),
                'values': df_top_price['median_price'].tolist()
            },
            'chart11': {
                'type': 'bar',
                'label': '',
                'labels': df_top_brand_rating['brandName'].tolist(),
                'values': df_top_brand_rating['median_rating'].tolist()
            },
            'heatmap1': {
                'type': 'heatmap',
                'brands': brands_rev,
                'data_old': data_old,
                'data_new': data_new,
            },
            'heatmap2': {
                'type': 'heatmap',
                'brands': brands,
                'data_old': data_old_rating,
                'data_new': data_new_rating, 
            },
            'chart12':{
                'labels': df_eye_color['eyeColor'].tolist(),
                'values': df_eye_color['total'].tolist()
            },
            'chart13':{
                'labels': df_age['age'].tolist(),
                'values': df_age['total'].tolist()
            },
            'chart14':{
                'labels': df_hair['hairCondition'].tolist(),
                'values': df_hair['total'].tolist()
            },
            'chart15':{
                'labels': df_skin_tone['skinTone'].tolist()[:5],
                'values': df_skin_tone['total'].tolist()[:5]
            },
            'chart16':{
                'labels': df_skin_type['skinType'].tolist(),
                'values': df_skin_type['total'].tolist()
            },
            'chart17':{
                'labels': df_radar.columns.tolist()[2:],
                'values': df_radar[df_radar['segment'] == 'Frequent, highly satisfied reviewers'].values[0][2:].tolist(),
                'segment': df_radar.segment.tolist(),
                'counts' : df_radar.client_count[0].tolist()
            },
            'chart18':{
                'labels': df_radar.columns.tolist()[2:],
                'values': df_radar[df_radar['segment'] == 'Occasional or mixed reviewers'].values[0][2:].tolist(),
                'segment': df_radar.segment.tolist(),
                'counts' : df_radar.client_count[1].tolist()
            },
            'chart19':{
                'labels': df_radar.columns.tolist()[2:],
                'values': df_radar[df_radar['segment'] == 'Category-focused reviewers'].values[0][2:].tolist(),
                'segment': df_radar.segment.tolist(),
                'counts' : df_radar.client_count[2].tolist()

            },
            'chart20':{
                'labels': df_radar.columns.tolist()[2:],
                'values': df_radar[df_radar['segment'] == 'Frequent, critical reviewers'].values[0][2:].tolist(),
                'segment': df_radar.segment.tolist(),
                'counts' : df_radar.client_count[3].tolist()
            },
        }
    }

finally:
    con.close()




