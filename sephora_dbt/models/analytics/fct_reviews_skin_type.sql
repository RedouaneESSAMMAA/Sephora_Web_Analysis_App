SELECT
    skinType,
    COUNT(*) AS total
FROM {{ ref('stg_reviews') }}
GROUP BY skinType
ORDER BY skinType