# ManufactureX — Manufacturing ERP

ManufactureX is a modern web-based Manufacturing ERP frontend designed to manage and monitor core manufacturing business operations from a single platform.

## Overview

ManufactureX provides a centralized interface for managing purchasing, inventory, production, quality, sales, payments, employees, payroll, maintenance, and business reports.

The project is built as a responsive React frontend with a modern dashboard and module-based navigation.

## Features

### Dashboard
- Inventory value
- Production overview
- Purchase and sales status
- Supplier and customer payments
- Employee and attendance summary
- Low-stock alerts
- Machine maintenance status

### Masters
- Products
- Suppliers
- Customers
- Employees
- Warehouses
- Machines

### Purchase
- Purchase Requests
- Purchase Orders
- Goods Receipts
- Supplier Payments

### Inventory
- Stock Overview
- Stock Movement
- Warehouse Transfer

### Production
- Bill of Materials
- Production Orders
- Production Tracking

### Quality
- Quality Checks
- Rejected / Quarantine Items

### Sales
- Customer Orders
- Dispatch
- Sales Invoices
- Customer Payments

### HR & Payroll
- Attendance
- Salary / Wages
- Payroll

### Maintenance
- Maintenance Records

### Reports
- Purchase Reports
- Stock Reports
- Production Reports
- Sales Reports
- Payment Reports
- HR Reports
- Payroll Reports
- Quality Reports
- Maintenance Reports

### Settings
- Users
- Roles
- Company Settings

## Authentication

The frontend includes:
- Login
- Signup
- Role selection
- Logout
- User role display

Authentication data is currently handled using browser local storage for frontend demonstration purposes.

## Technology Stack

- React
- Vite
- JavaScript
- React Router
- Lucide React
- CSS
- Local Storage

## Project Structure

```text
src/
├── components/
│   └── layout/
├── context/
├── data/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── masters/
│   ├── purchase/
│   ├── inventory/
│   ├── production/
│   ├── quality/
│   ├── sales/
│   ├── hr/
│   ├── maintenance/
│   ├── reports/
│   └── settings/
└── styles/