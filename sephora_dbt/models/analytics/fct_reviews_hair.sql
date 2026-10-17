SELECT
    hairCondition,
    COUNT(*) AS total
FROM {{ ref('stg_reviews') }}
GROUP BY 1
ORDER BY 1