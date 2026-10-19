WITH joined AS (
    SELECT
        r.CID,
        r.Rating,
        r.IsRecommended,
        r.IsFeatured,
        p.Category1
    FROM {{ ref('stg_reviews') }} r
    LEFT JOIN {{ ref('stg_products') }} p
        ON r.ProdID = p.skuId
    WHERE r.CID IS NOT NULL
),
client_base AS (
    SELECT
        CID,
        COUNT(*) AS review_count,
        AVG(Rating) AS avg_rating,
        100.0 * AVG(
            CASE WHEN IsRecommended THEN 1.0
                 WHEN IsRecommended = FALSE THEN 0.0
            END
        ) AS recommendation_pct,
        100.0 * AVG(
            CASE WHEN IsFeatured THEN 1.0
                 WHEN IsFeatured = FALSE THEN 0.0
            END
        ) AS featured_product_pct
    FROM joined
    GROUP BY CID
),
client_categories AS (
    SELECT
        CID,
        Category1,
        COUNT(*) AS category_reviews
    FROM joined
    WHERE Category1 IS NOT NULL
    GROUP BY CID, Category1
),
category_focus AS (
    SELECT
        CID,
        100.0 * MAX(category_reviews) / SUM(category_reviews)
            AS category_focus_pct
    FROM client_categories
    GROUP BY CID
)
SELECT
    b.CID,
    b.review_count,
    b.avg_rating,
    b.recommendation_pct,
    b.featured_product_pct,
    COALESCE(c.category_focus_pct, 0) AS category_focus_pct
FROM client_base b
LEFT JOIN category_focus c USING (CID)