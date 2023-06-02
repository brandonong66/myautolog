create database myautolog;
use myautolog;

CREATE TABLE User(
    userId integer primary key auto_increment,
    email varchar(255) not null,
    password varchar(255) not null,
    UNIQUE (email)
);

CREATE TABLE Car(
	carId integer primary key auto_increment,
    userId integer not null,
    userLabel varchar(255),
    year integer not null,
    make varchar(255) not null,
    model varchar(255) not null,
    color varchar(255),
    vin varchar(255),
    licensePlate varchar(255),
    notes varchar(255),
    FOREIGN KEY (userId) REFERENCES User(userId)
);
CREATE TABLE `Order`(
    orderId integer primary key auto_increment,
    userId integer not null,
    storeOrderId varchar(255),
    `source` varchar(255),
	url varchar(255),
    orderDate date not null,
    expectedArrivalDate date,
    subtotalPrice real not null,
    orderTax real not null,
    shippingPrice real not null,
    totalPrice real not null
);
CREATE TABLE ItemCategory(
	categoryId integer primary key auto_increment ,
    categoryName varchar(255) not null,
    userId integer,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Item(
    itemId integer primary key auto_increment,
    orderId integer not null,
    itemName varchar(255) not null,
    itemBrand varchar(255),
    partNumber varchar(255),
    notes varchar(255),
    price real not null,
    itemTax real not null,
    quantity integer not null,
	categoryId integer,
    carId integer,
    FOREIGN KEY (orderId) REFERENCES `Order`(orderId),
    FOREIGN KEY (categoryId) REFERENCES ItemCategory(categoryId),
    FOREIGN KEY (carId) REFERENCES Car(carId)
);


CREATE TABLE Mileage(
	carId integer not null,
    mileage integer not null,
    mileageDate date not null,
    FOREIGN KEY (carId) references Car(carId),
    PRIMARY KEY (carId, mileage)
);