SELECT
    *,
    CASE
        WHEN review_count >= 3 AND avg_rating >= 4
            THEN 'Frequent, highly satisfied reviewers'
        WHEN review_count >= 3 AND avg_rating <= 3
            THEN 'Frequent, critical reviewers'
        WHEN category_focus_pct >= 70
            THEN 'Category-focused reviewers'
        ELSE 'Occasional or mixed reviewers'
    END AS segment
FROM {{ ref('fct_client_features') }}