/*strings/text/varchar needs to be in single quotes*/

INSERT INTO users(user_name, password, email)
VALUES
('charlie', 'nuggets', 'charliearray@gmail.com'),
('jimmy', 'tacos1234', 'jimmysmith@gmail.com'),
('bob', 'lemons1234', 'bobsmith@gmail.com'),
('walter', 'cake1234', 'waltersmith@gmail.com');

INSERT INTO shoppinglist(item, quanity, users_id)
VALUES 
('Apple', 136.15, 1, 'AAPL'),
('Microsoft', 240.20, 1, 'MSFT'),
('Applied Materials', 100.70, 1, 'AMAT'),
('Advanced Micro Devices', 87.90, 2, 'AMD'),
('Mastercard', 339.09, 2, 'MA'),
('Cloudflare', 85.60, 2, 'NET'),
('Raytheon', 72.40, 3, 'RTX'),
('Shopify', 1291.00, 3, 'SHOP'),
('Boeing', 207.92, 3, 'BA'),
('JP Morgan', 138.25, 4, 'JPM'),
('iShares Silver ETF', 24.96, 4, 'SLV'),
('Visa', 209.75, 4, 'V');




