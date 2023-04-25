SELECT 
    id, breed, base, secondary, rarity, quantity, description
FROM
    inventory
WHERE 
    id = ?