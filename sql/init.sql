CREATE DATABASE weed;
use weed;
CREATE TABLE Strains (id INT NOT NULL PRIMARY KEY, strain VARCHAR(45), price INT, type VARCHAR(45));
CREATE TABLE Deck_Strains (id INT NOT NULL PRIMARY KEY, Decks_id INT, Strains_id INT);
CREATE TABLE Decks (id INT NOT NULL PRIMARY KEY, deck_name VARCHAR(45));
CREATE TABLE Emotion_Strains (id INT NOT NULL PRIMARY KEY, Emotions_id INT, Strains_id INT);
CREATE TABLE Emotions (id INT NOT NULL PRIMARY KEY, emotion_name VARCHAR(45));
ALTER TABLE Deck_Strains ADD CONSTRAINT fk_Decks_id FOREIGN KEY (Decks_id) REFERENCES Decks(id);
ALTER TABLE Deck_Strains ADD CONSTRAINT fk_Strains_id FOREIGN KEY (Strains_id) REFERENCES Strains(id);
ALTER TABLE Emotion_Strains ADD CONSTRAINT fk_Emotion_id FOREIGN KEY (Emotions_id) REFERENCES Emotions(id);
ALTER TABLE Emotion_Strains ADD CONSTRAINT fk__Strains_id FOREIGN KEY (Strains_id) REFERENCES Strains(id);
INSERT INTO Emotions (id, emotion_name) VALUES (1, "Stress"), (2, "Depression"), (3, "Pain"), (4, "Headaches"), (5, "Fatigue"), (6, "Insomnia"), (7, "Lack of Appetite");
INSERT INTO Strains (id, strain, price, type) VALUES (1,"Bubba Kush", 10, "Indica");
INSERT INTO Emotion_Strains (id, Emotions_id, Strains_id) VALUES (1, 1, 1);
INSERT INTO Decks (id, deck_name) VALUES (1, "Destressers");
INSERT INTO Deck_Strains (id, Decks_id, Strains_id) VALUES (1, 1, 1);

INSERT INTO Strains (id, strain, price, type) VALUES (2,"Blue Dream", 9, "Hybrid"),(3,"Blackberry Kush", 11, "Indica"), (4, "Girl Scout Cookies", 12, "Hybrid"), (5, "Green Crack", 10, "Sativa"), (6, "White Gorilla", 12, "Hybrid"), (7, "Frosty", 10, "Indica"), (8, "Alien Rift", 9, "Indica"), (9, "Chocolate Chunk", 13, "Indica"), (10, "Banana OG", 12, "Hybrid"), (11, "Mars OG", 12, "India"), (12, "Cali Kush", 10, "Hybrid"), (13, "God's Gift", 12, "Indica"), (14, "Herijuana", 10, "Indica"), (15, "Grapefruit", 12, "Sativa"), (16, "Jesus OG", 10, "Indica"), (17, "Khalifa Kush", 12, "Hybrid"), (18, "Durban Poison", 10, "Sativa"), (19, "Original Glue", 12, "Hybrid"), (20, "Pineapple Punch", 12, "Sativa"), (21, "Acapulco Gold", 8, "Sativa"), (22, "Island Sweet Skunk", 8, "Sativa"), (23, "Timewreck", 9, "Sativa"), (24, "Don Shula", 10, "Hybrid"), (25, "Jack Smack", 10, "Sativa"), (26, "Scout's Honor", 12, "Hybrid"), (27, "Cirrus", 11, "Sativa"), (28, "Chocolate Rain", 8, "Hybrid");
INSERT INTO Emotion_Strains (id, Emotions_id, Strains_id) VALUES (2, 1, 2), (3, 2, 2), (4, 6, 3), (5, 1, 4), (6, 2, 5), (7, 1, 6), (8, 3, 6), (9, 5, 7), (10, 3, 8), (11, 1, 8), (12, 4, 9), (13, 6, 9), (14, 3, 10), (15, 7, 10), (16, 7, 11), (17, 2, 12), (18, 7, 12), (19, 6, 13), (20, 1, 13), (21, 6, 14), (22, 2, 15), (23, 1, 16), (24, 2, 16), (25, 3, 16), (26, 1, 17), (27, 2, 17), (28, 3, 17), (29, 1, 18), (30, 2, 18), (31, 5, 18), (32, 1, 19), (33, 2, 19), (34, 3, 19), (35, 7, 20), (36, 2, 21), (37, 5, 21), (38, 3, 22), (39, 5, 22), (40, 2, 23), (41, 3, 23), (42, 5, 23), (43, 7, 23), (44, 7, 24), (45, 5, 24), (46, 1, 25), (47, 7, 25), (48, 7, 26), (49, 2, 26), (50, 4, 27), (51, 5, 27), (52, 4, 28);