create database myautolog;
use myautolog;

CREATE TABLE User(
    userId integer primary key auto_increment,
    email varchar(255) not null,
    password varchar(255) not null,
    UNIQUE (email)
);

CREATE TABLE `Order`(
    orderId integer primary key auto_increment,
    userId integer not null,
    storeOrderId varchar(255),
    orderDate date not null,
    expectedArrivalDate date,
    subtotalPrice real not null,
    orderTax real not null,
    shippingPrice real not null,
    totalPrice real not null
);

CREATE TABLE Item(
    itemId integer primary key auto_increment,
    itemName varchar(255) not null,
    itemBrand varchar(255),
    partNumber varchar(255),
    notes varchar(255),
    source varchar(255),
    price integer not null,
    itemTax real not null
);

CREATE TABLE OrderLineItem(
    orderId integer not null,
    itemId integer not null,
    PRIMARY KEY (orderId, itemId),
    FOREIGN KEY (orderId) REFERENCES `Order`(orderId),
    FOREIGN KEY (itemId) REFERENCES Item(itemId)
);

CREATE TABLE Car(
	carId integer primary key auto_increment,
    userId integer not null,
    userLabel varchar(255),
    year integer,
    make varchar(255),
    model varchar(255),
    vin varchar(255),
    notes varchar(255),
    FOREIGN KEY (userId) REFERENCES User(userId)
);