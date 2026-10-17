SELECT
    CID,
    prodID,
    ContentLocale,
    IsFeatured,
    Rating,
    IsRecommended,
    Date,
    Title,
    ReviewText,
    CASE
        WHEN eyeColor = 'Grey' THEN 'grey'
        WHEN eyeColor = 'gray' THEN 'grey'
        ELSE eyeColor
    END AS eyeColor,
    COALESCE(hairColor, 'UNDEFINED') AS hairColor,
    COALESCE(skinTone, 'UNDEFINED') AS skinTone,
    COALESCE(skinType, 'UNDEFINED') AS skinType,
    COALESCE(age, 'UNDEFINED') AS age,
    COALESCE(hairCondition, 'UNDEFINED') AS hairCondition,
    beautyInsider
FROM {{ source('raw', 'raw_reviews') }}
WHERE CID IS NOT NULL