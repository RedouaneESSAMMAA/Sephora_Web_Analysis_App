SELECT
    age,
    COUNT(*) as total
FROM {{ ref('stg_reviews') }}
GROUP BY age
ORDER BY
    CASE age
        WHEN '13to17' THEN 1
        WHEN '18to24' THEN 2
        WHEN '25to34' THEN 3
        WHEN '35to44' THEN 4
        WHEN '45to54' THEN 5
        WHEN 'over54' THEN 6
        WHEN 'UNDEFINED' THEN 7
        ELSE 8
    END