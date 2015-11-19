-- Initial user info table. Parent table.
CREATE TABLE userInfo (
  userId SERIAL PRIMARY KEY, 
  username VARCHAR not null, 
  password VARCHAR not null, 
  name VARCHAR not null, 
  email VARCHAR not null, 
  age INTEGER not null, 
  gender VARCHAR not null, 
  location VARCHAR not null,
  image BYTEA
);

-- This will define the activity. Constraint allows a primary key to be given to the userActivity. Child of userInfo. fk = foreign key, it means that userId needs to be in the parent table as well. Referential integrity.
CREATE TABLE userActivity (
  userId INTEGER not null,
  userActivity VARCHAR not null,
  constraint pk_userActivity 
    PRIMARY KEY (userId, userActivity),
  constraint fk_userActivity_userInfo
    FOREIGN KEY (userId)
    REFERENCES userInfo (userId)
);

-- This will give each activity some properties and attributes. For example: pace is the name and 8min is the value. Child of userActivity.
CREATE TABLE activityProperty (
  userId INTEGER not null,
  userActivity VARCHAR not null,
  propertyName VARCHAR not null,
  propertyValue VARCHAR not null,
  constraint pk_activityProperty 
    PRIMARY KEY (userId, userActivity, propertyName),
  constraint fk_activityProperty_userActivity
    FOREIGN KEY (userId, userActivity)
    REFERENCES userActivity (userId, userActivity)
);

-- Give each chat room an id. Save the name and conversation
CREATE TABLE userChatRooms (
  userId INTEGER not null,
  chatRoomId SERIAL not null,
  name VARCHAR not null,
  conversation TEXT,
  constraint pk_userChatRooms
    PRIMARY KEY (userId, chatRoomId),
  constraint fk_userChatRooms_userInfo
    FOREIGN KEY (userId)
    REFERENCES userInfo (userId)
);

-- Give friends a status of pending, workout friend, not friend
CREATE TABLE friends (
  userId INTEGER not null,
  friendUserId INTEGER not null,
  status VARCHAR not null, -- Pending, Friend, Enemy
  constraint pk_friends
    PRIMARY KEY (userId, friendUserId),
  constraint fk1_friends_userInfo
    FOREIGN KEY (userId) 
    REFERENCES userInfo (userId),
  constraint fk2_friends_userInfo
    FOREIGN KEY (friendUserId)
    REFERENCES userInfo (userId)
);


