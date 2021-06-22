CREATE DATABASE  IF NOT EXISTS `advanced` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `advanced`;
-- MariaDB dump 10.19  Distrib 10.5.10-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: advanced
-- ------------------------------------------------------
-- Server version	10.5.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Nissan'),(2,'Toyota'),(3,'Bugati'),(4,'Ford'),(5,'Chevrolet');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_models`
--

DROP TABLE IF EXISTS `car_models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_models` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_models`
--

LOCK TABLES `car_models` WRITE;
/*!40000 ALTER TABLE `car_models` DISABLE KEYS */;
INSERT INTO `car_models` VALUES (1,'Model A','-'),(2,'Model B','-'),(3,'Model C','-'),(4,'Model D','model d'),(5,'Model E','model e');
/*!40000 ALTER TABLE `car_models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_options`
--

DROP TABLE IF EXISTS `car_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `engine` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transmission` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_options`
--

LOCK TABLES `car_options` WRITE;
/*!40000 ALTER TABLE `car_options` DISABLE KEYS */;
INSERT INTO `car_options` VALUES (1,'V8','Red','Manual');
/*!40000 ALTER TABLE `car_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_types`
--

DROP TABLE IF EXISTS `car_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_types`
--

LOCK TABLES `car_types` WRITE;
/*!40000 ALTER TABLE `car_types` DISABLE KEYS */;
INSERT INTO `car_types` VALUES (1,'Convertible');
/*!40000 ALTER TABLE `car_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `vin` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` bigint(20) unsigned NOT NULL,
  `type` bigint(20) unsigned NOT NULL,
  `model` bigint(20) unsigned NOT NULL,
  `option` bigint(20) unsigned NOT NULL,
  `price` double(32,2) NOT NULL,
  `transfered` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`vin`),
  KEY `cars_brand_foreign` (`brand`),
  KEY `cars_type_foreign` (`type`),
  KEY `cars_model_foreign` (`model`),
  KEY `cars_option_foreign` (`option`),
  CONSTRAINT `cars_brand_foreign` FOREIGN KEY (`brand`) REFERENCES `brands` (`id`),
  CONSTRAINT `cars_model_foreign` FOREIGN KEY (`model`) REFERENCES `car_models` (`id`),
  CONSTRAINT `cars_option_foreign` FOREIGN KEY (`option`) REFERENCES `car_options` (`id`),
  CONSTRAINT `cars_type_foreign` FOREIGN KEY (`type`) REFERENCES `car_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES ('0674A318D5',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('087EB1B2DC',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('0A82652DCA',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('0E1742C08B',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('0ECA3FE2E0',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('1039152189',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('15B6153677',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('34FD356EF5',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('3B5C6E0B01',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('3D585E4C22',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('3E1E1B18B6',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('40C317E21B',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('42636B55FB',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('43881C655F',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('47145A72C0',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('51C7C6AD26',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('5886680CB9',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('5BADE97BAF',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('5F5A3BF3EC',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('63F4AC58A6',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('6831A8398F',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('7B7542122C',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('89CC14862C',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('8FFABDFFC4',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('9A5C74D079',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('9A6F75849B',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('A6E1B9770F',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('AC9128303F',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('ADFECB7B18',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('B525FFDC56',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('B6D9AF3FD7',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('B97FC2AF39',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('BD1F8F2FF3',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:02'),('C584CD965D',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('C7D8B9AACD',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('C99BFF6710',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:03'),('CDEE4D3D6E',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('D0297E236D',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('D2299F6D23',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:03'),('D2872F1EC6',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('D8E2F2AEFC',5,1,5,1,500000.00,1,'2021-06-22 04:29:23','2021-06-22 04:31:07'),('D9F2A7BAF3',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('DD4BEA2543',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01'),('DFD0E5DEAA',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('E27879133C',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('E6106A3B84',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('E6D163E820',2,1,2,1,200000.00,1,'2021-06-22 04:28:39','2021-06-22 04:31:03'),('F2B4FDD6F0',3,1,3,1,300000.00,1,'2021-06-22 04:28:51','2021-06-22 04:31:04'),('F613F563BD',4,1,4,1,400000.00,1,'2021-06-22 04:29:08','2021-06-22 04:31:06'),('F9F98764DA',1,1,1,1,100000.00,1,'2021-06-22 04:28:25','2021-06-22 04:31:01');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('m','f') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `income` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customers_account_foreign` (`account`),
  CONSTRAINT `customers_account_foreign` FOREIGN KEY (`account`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'User A',NULL,NULL,NULL,NULL,4,NULL,NULL),(2,'User B',NULL,NULL,NULL,NULL,5,NULL,NULL),(3,'User C',NULL,NULL,NULL,NULL,6,NULL,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealers`
--

DROP TABLE IF EXISTS `dealers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account` bigint(20) unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `motto` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dealers_account_foreign` (`account`),
  CONSTRAINT `dealers_account_foreign` FOREIGN KEY (`account`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealers`
--

LOCK TABLES `dealers` WRITE;
/*!40000 ALTER TABLE `dealers` DISABLE KEYS */;
INSERT INTO `dealers` VALUES (1,2,'Dealer1','',''),(2,3,'Dealer2','','');
/*!40000 ALTER TABLE `dealers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_types`
--

DROP TABLE IF EXISTS `employee_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_types`
--

LOCK TABLES `employee_types` WRITE;
/*!40000 ALTER TABLE `employee_types` DISABLE KEYS */;
INSERT INTO `employee_types` VALUES (1,'Admin');
/*!40000 ALTER TABLE `employee_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` bigint(20) unsigned NOT NULL,
  `dealer` bigint(20) unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `working_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `address` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_type_foreign` (`type`),
  KEY `employees_dealer_foreign` (`dealer`),
  CONSTRAINT `employees_dealer_foreign` FOREIGN KEY (`dealer`) REFERENCES `dealers` (`id`),
  CONSTRAINT `employees_type_foreign` FOREIGN KEY (`type`) REFERENCES `employee_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,1,1,'Ivan','ivan@navi.com','0812345678','2020-10-09 16:00:00','Jimbaran');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories`
--

DROP TABLE IF EXISTS `inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dealer` bigint(20) unsigned NOT NULL,
  `car` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sold` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inventories_dealer_foreign` (`dealer`),
  KEY `inventories_car_foreign` (`car`),
  CONSTRAINT `inventories_car_foreign` FOREIGN KEY (`car`) REFERENCES `cars` (`vin`),
  CONSTRAINT `inventories_dealer_foreign` FOREIGN KEY (`dealer`) REFERENCES `dealers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories`
--

LOCK TABLES `inventories` WRITE;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
INSERT INTO `inventories` VALUES (1,1,'0674A318D5',1,'2021-06-22 04:31:01','2021-06-22 04:31:52'),(2,1,'087EB1B2DC',1,'2021-06-22 04:31:01','2021-06-22 04:32:57'),(3,1,'51C7C6AD26',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(4,1,'7B7542122C',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(5,1,'89CC14862C',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(6,1,'9A6F75849B',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(7,1,'D0297E236D',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(8,1,'D9F2A7BAF3',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(9,1,'DD4BEA2543',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(10,1,'F9F98764DA',0,'2021-06-22 04:31:01','2021-06-22 04:31:01'),(11,1,'0A82652DCA',1,'2021-06-22 04:31:02','2021-06-22 04:32:26'),(12,1,'42636B55FB',1,'2021-06-22 04:31:02','2021-06-22 04:33:04'),(13,1,'5BADE97BAF',0,'2021-06-22 04:31:02','2021-06-22 04:31:02'),(14,1,'8FFABDFFC4',0,'2021-06-22 04:31:02','2021-06-22 04:31:02'),(15,1,'B525FFDC56',0,'2021-06-22 04:31:02','2021-06-22 04:31:02'),(16,1,'B97FC2AF39',0,'2021-06-22 04:31:02','2021-06-22 04:31:02'),(17,1,'BD1F8F2FF3',0,'2021-06-22 04:31:02','2021-06-22 04:31:02'),(18,1,'C99BFF6710',0,'2021-06-22 04:31:03','2021-06-22 04:31:03'),(19,1,'D2299F6D23',0,'2021-06-22 04:31:03','2021-06-22 04:31:03'),(20,1,'E6D163E820',0,'2021-06-22 04:31:03','2021-06-22 04:31:03'),(21,1,'1039152189',1,'2021-06-22 04:31:04','2021-06-22 04:31:53'),(22,1,'15B6153677',1,'2021-06-22 04:31:04','2021-06-22 04:32:28'),(23,1,'40C317E21B',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(24,1,'43881C655F',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(25,1,'5886680CB9',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(26,1,'5F5A3BF3EC',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(27,1,'9A5C74D079',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(28,1,'C7D8B9AACD',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(29,1,'E6106A3B84',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(30,1,'F2B4FDD6F0',0,'2021-06-22 04:31:04','2021-06-22 04:31:04'),(31,2,'34FD356EF5',1,'2021-06-22 04:31:06','2021-06-22 04:32:29'),(32,2,'3B5C6E0B01',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(33,2,'3D585E4C22',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(34,2,'AC9128303F',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(35,2,'ADFECB7B18',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(36,2,'C584CD965D',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(37,2,'CDEE4D3D6E',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(38,2,'DFD0E5DEAA',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(39,2,'E27879133C',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(40,2,'F613F563BD',0,'2021-06-22 04:31:06','2021-06-22 04:31:06'),(41,2,'0E1742C08B',1,'2021-06-22 04:31:07','2021-06-22 04:31:54'),(42,2,'0ECA3FE2E0',1,'2021-06-22 04:31:07','2021-06-22 04:33:03'),(43,2,'3E1E1B18B6',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(44,2,'47145A72C0',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(45,2,'63F4AC58A6',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(46,2,'6831A8398F',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(47,2,'A6E1B9770F',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(48,2,'B6D9AF3FD7',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(49,2,'D2872F1EC6',0,'2021-06-22 04:31:07','2021-06-22 04:31:07'),(50,2,'D8E2F2AEFC',0,'2021-06-22 04:31:07','2021-06-22 04:31:07');
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account` bigint(20) unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `motto` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manufacturers_account_foreign` (`account`),
  CONSTRAINT `manufacturers_account_foreign` FOREIGN KEY (`account`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2000_06_09_053855_create_user_types_table',1),(2,'2014_10_12_000000_create_users_table',1),(3,'2014_10_12_100000_create_password_resets_table',1),(4,'2019_08_19_000000_create_failed_jobs_table',1),(5,'2019_12_14_000001_create_personal_access_tokens_table',1),(6,'2021_06_09_054353_create_brands_table',1),(7,'2021_06_09_054406_create_car_types_table',1),(8,'2021_06_09_054410_create_car_models_table',1),(9,'2021_06_09_054410_create_car_options_table',1),(10,'2021_06_09_054411_create_cars_table',1),(11,'2021_06_09_054450_create_dealers_table',1),(12,'2021_06_09_054504_create_employee_types_table',1),(13,'2021_06_09_054511_create_employees_table',1),(14,'2021_06_09_054521_create_manufacturers_table',1),(15,'2021_06_09_054532_create_suppliers_table',1),(16,'2021_06_09_054539_create_parts_table',1),(17,'2021_06_09_054549_create_customers_table',1),(18,'2021_06_09_054550_create_transaction_statuses_table',1),(19,'2021_06_09_054607_create_transaction_types_table',1),(20,'2021_06_09_054624_create_transactions_table',1),(21,'2021_06_17_130622_create_transaction_cars_table',1),(22,'2021_06_21_005350_create_inventories_table',1),(23,'2021_06_21_043601_create_sales_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parts` (
  `code` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier` bigint(20) unsigned DEFAULT NULL,
  `manufacturer` bigint(20) unsigned DEFAULT NULL,
  `model` bigint(20) unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`code`),
  KEY `parts_supplier_foreign` (`supplier`),
  KEY `parts_manufacturer_foreign` (`manufacturer`),
  KEY `parts_model_foreign` (`model`),
  CONSTRAINT `parts_manufacturer_foreign` FOREIGN KEY (`manufacturer`) REFERENCES `manufacturers` (`id`),
  CONSTRAINT `parts_model_foreign` FOREIGN KEY (`model`) REFERENCES `car_models` (`id`),
  CONSTRAINT `parts_supplier_foreign` FOREIGN KEY (`supplier`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (4,'App\\Models\\User',1,'automobile@navi.com','a9130a0175bc73417e483f46da78ebf9801255a26d08f40c9f4a686f459af551','[\"*\"]','2021-06-22 04:34:23','2021-06-22 04:30:57','2021-06-22 04:34:23'),(5,'App\\Models\\User',4,'usera@navi.com','3d3b7f60fdb9f5f047c56295a0d8f55f46f6826118d4b302d011eb0c3f6451dc','[\"*\"]','2021-06-22 04:31:49','2021-06-22 04:31:40','2021-06-22 04:31:49'),(6,'App\\Models\\User',5,'userb@navi.com','b663901d97b0dbd03e6930e820f0e9f275905fca645bfb31df84760f4ec69060','[\"*\"]','2021-06-22 04:32:24','2021-06-22 04:32:15','2021-06-22 04:32:24'),(7,'App\\Models\\User',6,'userc@navi.com','5dc0d626507fe8a7e1b9d01f6277651dfe31fd8705bd30670aee9725adcfda4a','[\"*\"]','2021-06-22 04:32:55','2021-06-22 04:32:43','2021-06-22 04:32:55');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `customer` bigint(20) unsigned NOT NULL,
  `inventory` bigint(20) unsigned NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_customer_foreign` (`customer`),
  KEY `sales_inventory_foreign` (`inventory`),
  CONSTRAINT `sales_customer_foreign` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`),
  CONSTRAINT `sales_inventory_foreign` FOREIGN KEY (`inventory`) REFERENCES `inventories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,1,1,'2021-06-22 04:31:44','2021-06-22 04:31:52'),(2,1,21,1,'2021-06-22 04:31:47','2021-06-22 04:31:53'),(3,1,41,1,'2021-06-22 04:31:49','2021-06-22 04:31:54'),(4,2,11,1,'2021-06-22 04:32:19','2021-06-22 04:32:26'),(5,2,31,1,'2021-06-22 04:32:22','2021-06-22 04:32:29'),(6,2,22,1,'2021-06-22 04:32:24','2021-06-22 04:32:28'),(7,3,12,1,'2021-06-22 04:32:47','2021-06-22 04:33:01'),(8,3,12,1,'2021-06-22 04:32:48','2021-06-22 04:33:04'),(9,3,42,1,'2021-06-22 04:32:53','2021-06-22 04:33:03'),(10,3,2,1,'2021-06-22 04:32:55','2021-06-22 04:32:57');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account` bigint(20) unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `motto` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `suppliers_account_foreign` (`account`),
  CONSTRAINT `suppliers_account_foreign` FOREIGN KEY (`account`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_cars`
--

DROP TABLE IF EXISTS `transaction_cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_cars` (
  `transaction` bigint(20) unsigned NOT NULL,
  `car` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `transaction_cars_transaction_foreign` (`transaction`),
  KEY `transaction_cars_car_foreign` (`car`),
  CONSTRAINT `transaction_cars_car_foreign` FOREIGN KEY (`car`) REFERENCES `cars` (`vin`),
  CONSTRAINT `transaction_cars_transaction_foreign` FOREIGN KEY (`transaction`) REFERENCES `transactions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_cars`
--

LOCK TABLES `transaction_cars` WRITE;
/*!40000 ALTER TABLE `transaction_cars` DISABLE KEYS */;
INSERT INTO `transaction_cars` VALUES (1,'0674A318D5','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'087EB1B2DC','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'51C7C6AD26','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'7B7542122C','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'89CC14862C','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'9A6F75849B','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'D0297E236D','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'D9F2A7BAF3','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'DD4BEA2543','2021-06-22 04:31:01','2021-06-22 04:31:01'),(1,'F9F98764DA','2021-06-22 04:31:01','2021-06-22 04:31:01'),(2,'0A82652DCA','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'42636B55FB','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'5BADE97BAF','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'8FFABDFFC4','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'B525FFDC56','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'B97FC2AF39','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'BD1F8F2FF3','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'C99BFF6710','2021-06-22 04:31:02','2021-06-22 04:31:02'),(2,'D2299F6D23','2021-06-22 04:31:03','2021-06-22 04:31:03'),(2,'E6D163E820','2021-06-22 04:31:03','2021-06-22 04:31:03'),(3,'1039152189','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'15B6153677','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'40C317E21B','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'43881C655F','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'5886680CB9','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'5F5A3BF3EC','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'9A5C74D079','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'C7D8B9AACD','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'E6106A3B84','2021-06-22 04:31:04','2021-06-22 04:31:04'),(3,'F2B4FDD6F0','2021-06-22 04:31:04','2021-06-22 04:31:04'),(4,'34FD356EF5','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'3B5C6E0B01','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'3D585E4C22','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'AC9128303F','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'ADFECB7B18','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'C584CD965D','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'CDEE4D3D6E','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'DFD0E5DEAA','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'E27879133C','2021-06-22 04:31:06','2021-06-22 04:31:06'),(4,'F613F563BD','2021-06-22 04:31:06','2021-06-22 04:31:06'),(5,'0E1742C08B','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'0ECA3FE2E0','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'3E1E1B18B6','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'47145A72C0','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'63F4AC58A6','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'6831A8398F','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'A6E1B9770F','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'B6D9AF3FD7','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'D2872F1EC6','2021-06-22 04:31:07','2021-06-22 04:31:07'),(5,'D8E2F2AEFC','2021-06-22 04:31:07','2021-06-22 04:31:07');
/*!40000 ALTER TABLE `transaction_cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_statuses`
--

DROP TABLE IF EXISTS `transaction_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_statuses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_statuses`
--

LOCK TABLES `transaction_statuses` WRITE;
/*!40000 ALTER TABLE `transaction_statuses` DISABLE KEYS */;
INSERT INTO `transaction_statuses` VALUES (1,'Requested'),(2,'Accepted');
/*!40000 ALTER TABLE `transaction_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_types`
--

DROP TABLE IF EXISTS `transaction_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_types`
--

LOCK TABLES `transaction_types` WRITE;
/*!40000 ALTER TABLE `transaction_types` DISABLE KEYS */;
INSERT INTO `transaction_types` VALUES (1,'Purchase'),(2,'Sell');
/*!40000 ALTER TABLE `transaction_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee` bigint(20) unsigned NOT NULL,
  `dealer` bigint(20) unsigned NOT NULL,
  `type` bigint(20) unsigned NOT NULL,
  `model` bigint(20) unsigned NOT NULL,
  `amount` int(11) NOT NULL,
  `status` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transactions_employee_foreign` (`employee`),
  KEY `transactions_dealer_foreign` (`dealer`),
  KEY `transactions_type_foreign` (`type`),
  KEY `transactions_model_foreign` (`model`),
  KEY `transactions_status_foreign` (`status`),
  CONSTRAINT `transactions_dealer_foreign` FOREIGN KEY (`dealer`) REFERENCES `dealers` (`id`),
  CONSTRAINT `transactions_employee_foreign` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`),
  CONSTRAINT `transactions_model_foreign` FOREIGN KEY (`model`) REFERENCES `car_models` (`id`),
  CONSTRAINT `transactions_status_foreign` FOREIGN KEY (`status`) REFERENCES `transaction_statuses` (`id`),
  CONSTRAINT `transactions_type_foreign` FOREIGN KEY (`type`) REFERENCES `transaction_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,1,1,1,10,2,'2021-06-22 04:30:09','2021-06-22 04:31:01'),(2,1,1,1,2,10,2,'2021-06-22 04:30:16','2021-06-22 04:31:03'),(3,1,1,1,3,10,2,'2021-06-22 04:30:23','2021-06-22 04:31:04'),(4,1,2,1,4,10,2,'2021-06-22 04:30:45','2021-06-22 04:31:06'),(5,1,2,1,5,10,2,'2021-06-22 04:30:50','2021-06-22 04:31:07');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'automobile'),(2,'dealer'),(3,'supplier'),(4,'manufacturer'),(5,'user');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` bigint(20) unsigned NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_type_foreign` (`type`),
  CONSTRAINT `users_type_foreign` FOREIGN KEY (`type`) REFERENCES `user_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Automobile','automobile@navi.com',1,NULL,'$2y$10$pm07c0jJ1JpAPCFldzW0Cu2F0t0G3BLs4nCAmVUdR5A7J5is/zDPu',NULL,NULL,NULL),(2,'Dealer1','dealer1@navi.com',2,NULL,'$2y$10$pm07c0jJ1JpAPCFldzW0Cu2F0t0G3BLs4nCAmVUdR5A7J5is/zDPu',NULL,NULL,NULL),(3,'Dealer2','dealer2@navi.com',2,NULL,'$2y$10$pm07c0jJ1JpAPCFldzW0Cu2F0t0G3BLs4nCAmVUdR5A7J5is/zDPu',NULL,NULL,NULL),(4,'User A','usera@navi.com',3,NULL,'$2y$10$pm07c0jJ1JpAPCFldzW0Cu2F0t0G3BLs4nCAmVUdR5A7J5is/zDPu',NULL,NULL,NULL),(5,'User B','userb@navi.com',3,NULL,'$2y$10$pm07c0jJ1JpAPCFldzW0Cu2F0t0G3BLs4nCAmVUdR5A7J5is/zDPu',NULL,NULL,NULL),(6,'User C','userc@navi.com',3,NULL,'$2y$10$pm07c0jJ1JpAPCFldzW0Cu2F0t0G3BLs4nCAmVUdR5A7J5is/zDPu',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-22 20:42:33
