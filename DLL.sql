create database training
use training;

CREATE SCHEMA training;
GO

CREATE TABLE training.Banks (
    BankId INT IDENTITY(1,1) PRIMARY KEY,
    BankName VARCHAR(100) NOT NULL UNIQUE,
    HeadOfficeAddress VARCHAR(200) NOT NULL,
    IFSCCode CHAR(11) NOT NULL UNIQUE,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL
);
GO

CREATE TABLE training.Branches (
    BranchId INT IDENTITY(1,1) PRIMARY KEY,
    BankId INT NOT NULL,
    BranchName VARCHAR(100) NOT NULL,
    BranchCode CHAR(5) NOT NULL UNIQUE,
    Address VARCHAR(200),
    ManagerUserId INT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (BankId) REFERENCES training.Banks(BankId)
);
GO

CREATE TABLE training.Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(256) NOT NULL,
    DateOfBirth DATE NOT NULL CHECK (DateOfBirth <= GETDATE() AND DateOfBirth >= DATEADD(YEAR, -120, GETDATE())),
    UserType VARCHAR(20) CHECK (UserType IN ('Normal', 'Bank')) NOT NULL,
    IsDeleted BIT DEFAULT 0 NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL
);
GO

CREATE TABLE training.Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName VARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE training.Permissions (
    PermissionId INT IDENTITY(1,1) PRIMARY KEY,
    PermissionName VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE training.UserRoles (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    PRIMARY KEY (UserId, RoleId),
    FOREIGN KEY (UserId) REFERENCES training.Users(UserId),
    FOREIGN KEY (RoleId) REFERENCES training.Roles(RoleId)
);
GO

CREATE TABLE training.RolePermissions (
    RoleId INT NOT NULL,
    PermissionId INT NOT NULL,
    PRIMARY KEY (RoleId, PermissionId),
    FOREIGN KEY (RoleId) REFERENCES training.Roles(RoleId),
    FOREIGN KEY (PermissionId) REFERENCES training.Permissions(PermissionId)
);
GO


CREATE TABLE training.Accounts (
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    BranchId INT NOT NULL,
    AccountNumber CHAR(10) NOT NULL UNIQUE CHECK (AccountNumber NOT LIKE '%[^0-9]%'),
    AccountType VARCHAR(20) NOT NULL CHECK (AccountType IN ('Savings', 'Current', 'TermDeposit')),
    CurrencyCode CHAR(3) NOT NULL CHECK (CurrencyCode IN ('INR','USD','EUR','GBP')),
    Balance DECIMAL(18,2) DEFAULT 0.00 NOT NULL,
    IsMinor BIT DEFAULT 0 NOT NULL,
    PowerOfAttorneyUserId INT NULL,
    MaturityDate DATE NULL,
    InterestRate DECIMAL(5,2) NULL,
    IsClosed BIT DEFAULT 0 NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (UserId) REFERENCES training.Users(UserId),
    FOREIGN KEY (BranchId) REFERENCES training.Branches(BranchId),
    FOREIGN KEY (PowerOfAttorneyUserId) REFERENCES training.Users(UserId)
);
GO

CREATE TABLE training.Transactions (
    TransactionId BIGINT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT NOT NULL,
    TransactionType VARCHAR(10) CHECK (TransactionType IN ('Deposit','Withdraw')) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL CHECK (Amount > 0),
    TransactionDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (AccountId) REFERENCES training.Accounts(AccountId)
);
GO

