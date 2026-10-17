SELECT
    skinTone,
    COUNT(*) AS total
FROM {{ ref('stg_reviews') }}
GROUP BY skinTone
ORDER BY skinTone