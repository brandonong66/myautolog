start transaction;

INSERT INTO Car (carId, userId, userLabel, year, make, model, notes) VALUES
(1, 1, "E30", 1991, "BMW", "325i", "Convertible. M50B25 Swapped"),
(2, 1, "E90", 2006, "BMW" , "325i", "Sedan. Bagged on airtekk struts and airlift v2 management");

INSERT INTO `Order` (orderId, userId, storeOrderId, source, url, orderDate, expectedArrivalDate, subtotalPrice, orderTax, shippingPrice, totalPrice) VALUES
(1, 1, "R576474056", "fcpeuro", "https://www.fcpeuro.com/orders/R576474056", "2023-02-11", "2023-02-22", "84.77", "7.95", "0", "92.72"),
(2, 1, "R918389183", "fcpeuro", "https://www.fcpeuro.com/orders/R918389183", "2023-02-01", "2023-02-14", "49.37", "4.62", "0", "53.99"),
(3, 1, "R999055397", "fcpeuro", "https://www.fcpeuro.com/orders/R999055397", "2023-01-24", "2023-02-03", "135.85", "12.74", "0", "148.59"),
(4, 1, "R151286134", "fcpeuro", "https://www.fcpeuro.com/orders/R151286134", "2022-10-28", "2022-11-08", "157.56", "14.76", "0", "172.32"),
(5, 1, "557036", "bimmerworld", "https://secure.bimmerworld.com/myaccount-1-06-0/index.ssp?sc=6#/ordershistory/view/2504754", "2022-07-29", null, "49.97", "4.68", "15.99", "70.64"),
(6, 1, "556052", "bimmerworld", "https://secure.bimmerworld.com/myaccount-1-06-0/index.ssp?sc=6#/ordershistory/view/2492293", "2022-07-24", null, "61.07", "5.73", "15.99", "82.79"),
(7, 1, "GAR41400", "garagistic", "https://www.garagistic.com/account/orders/1b0b405b6727d55b5751eaeba2a076ce", "2022-09-20", null, "111.55", "8.09", "43.12", "162.76");


INSERT INTO Item (itemId, orderId, itemName, itemBrand, partNumber, notes, price, itemTax, quantity, category, carId) VALUES
(1, 1, "Coolant Level Sensor", "Febi Bilstein", "61311378320",  "", 13.69, 1.28, 1, "Maintenance", 1),
(2, 1, "Oxygen Sensor", "Bosch", "11781247235", "", 57.99, 5.44, 1, "Maintenance", 1),
(3, 2, "Valve Cover Screw Set", "Febi Bilstein", "11120409288", "", 26.39, 2.47, 1, "Maintenance", 1),
(4, 2, "Windshield Wiper Blade", "Valeo", "61611387678", "", 11.49, 1.08, 2, "Maintenance", 1),
(5, 3, "BMW Expanding Nut", "Genuine BMW", "63121374075", "",  0.69, 0.06, 10, "Other", 2),
(6, 3, "BMW Coolant Expansion Tank", "Mahle Behr", "17111712641", "", 39.59, 3.71, 1, "Maintenance", 1),
(7, 3, "BMW Valve Cover Gasket Kit", "Elring", "11127581215", "",  89.36, 8.38, 1, "Maintenance", 2),
(8, 4, "Brake Booster O-Ring", "Genuine BMW", "34311159006", "", 5.49, 0.51, 1, "Maintenance", 1),
(9, 4, "Brake Booster Gasket", "ATE", "34336765316", "", 1.29, 0.12, 2, "Maintenance", 1),
(10, 4, "Radiator", "Nissens", "17111468078", "",  149.49, 14, 1, "Maintenance", 1),
(11, 5, "Exhaust Manifold Header Gasket", "Elring", "11621744252", "", 7.49, 0.7, 2, "Maintenance", 1),
(12, 5, "EGR Block-Off Plate", "Bimmerworld", "", "", 34.99, 3.28, 1, "Performance", 1),
(13, 6, "Thermostat Coolant Hose", "Genuine BMW", "64218367834", "",  "11.65", "1.09", 1,"Maintenance", 1),
(14, 6, "Main Heater Coolant Hose", "URO", "11531722743", "",    "27.93", "2.62", 1, "Maintenance", 1),
(15, 6, "Heater Coolant Hose", "URO", "64218367790", "",   "17.72", "1.66", 1, "Maintenance", 1),
(16, 6, "Heater Coolant Hose", "URO", "64218367791", "",   "3.77", "0.35", 1, "Maintenance", 1),
(17, 7, "E30 Garagistic Front Strut Bar - M42, M20, M50 Compatible - Bare", "Garagistic", "", "",  "80.75", "5.86", 1, "Performance", 1),
(18, 7, "Motometer E30 Odometer Gears - US MPH", "Garagistic", "", "",  "30.8", "2.23", 1, "Maintenance", 1);
commit;
