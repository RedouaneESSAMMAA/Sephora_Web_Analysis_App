WITH segment_averages AS (
    SELECT
        segment,
        COUNT(*) AS client_count,
        AVG(review_count) AS avg_reviews,
        AVG(avg_rating) AS avg_rating,
        AVG(recommendation_pct) AS recommendation_pct,
        AVG(featured_product_pct) AS featured_product_pct,
        AVG(category_focus_pct) AS category_focus_pct
    FROM {{ ref('fct_client_segments') }}
    GROUP BY segment
),
totals AS (
    SELECT SUM(client_count) AS total_clients
    FROM segment_averages
),
max_activity AS (
    SELECT MAX(avg_reviews) AS max_avg_reviews
    FROM segment_averages
)
SELECT
    s.segment,
    ROUND(s.client_count, 2) AS client_count,
    ROUND(100.0 * s.client_count / NULLIF(t.total_clients, 0), 2) AS client_share_pct,
    ROUND(CASE
        WHEN m.max_avg_reviews > 0
        THEN 100.0 * LN(1 + s.avg_reviews) / LN(1 + m.max_avg_reviews)
        ELSE 0
    END, 2) AS review_activity,
    ROUND(100.0 * (s.avg_rating - 1) / 4, 2) AS satisfaction,
    ROUND(s.recommendation_pct, 2) AS recommendation_pct,
    ROUND(s.featured_product_pct, 2) AS featured_product_pct,
    ROUND(s.category_focus_pct, 2) AS category_focus_pct
FROM segment_averages s
CROSS JOIN totals AS t
CROSS JOIN max_activity m
