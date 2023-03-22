CREATE TABLE `items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `breed` VARCHAR(45) NOT NULL,
  `base` VARCHAR(45) NOT NULL,
  `secondary` VARCHAR(45) NOT NULL,
  `rarity` VARCHAR(45) NOT NULL,
  `quantity` INT NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`id`));