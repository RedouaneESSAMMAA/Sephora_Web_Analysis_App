SELECT
    eyeColor,
    COUNT(*) AS total
FROM {{ ref('stg_reviews') }}
GROUP BY eyeColor
ORDER BY eyeColor