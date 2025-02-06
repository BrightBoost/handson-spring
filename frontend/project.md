## React project

We're going to create a backend for a basic react application tracking issues.

Here's how to start the react application. In the terminal type:
```
cd frontend
npm install
npm run dev
```

You can open the app on the indicated port. It's should not display any data yet, because the backend is not implemented. Here's how it will work: 
- You can create a new **user** by sending a `POST` request to `/api/users` with `{ "name": "John Doe" }`.
- You can create an **issue** for a specific user by sending a `POST` request to `/api/issues/{userId}` with `{ "description": "Some issue", "category": "Bug" }`.
- You can fetch **all users** via `GET /api/users`.
- You can fetch **all issues** via `GET /api/issues`.

And guess what? That's your job! Here are the steps and instructions for doing that:

### **0. Generate the Spring App With `start.spring.io`**

### **1. `application.properties` (Configuration for MySQL)**
This file configures the database connection.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/issue_tracker
spring.datasource.username=root
spring.datasource.password=[yourpassword]
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### **2. `User` Entity (`User.java`)**
This entity represents a user in the system. It has an Long id, String name, List<Issue> issues.

---

### **3. `Issue` Entity (`Issue.java`)**
This entity represents an issue connected to a user. It has an Long id, String description, String category, List<User> users.

---

### **4. Create the DTOs for both the `Issue` Entity and `User` Entity**

---

### **5. User Repository (`UserRepository.java`)**
Handles database operations for users.

---

### **6. Issue Repository (`IssueRepository.java`)**
Handles database operations for issues.

---

### **7. User Service (`UserService.java`)**
Handles business logic related to users. Give it the following methods (you'll need to implement them).

```java

    public List<UserDTO> getAllUsers() {
    }

    public User createUser(User user) {
    }
}
```

---

### **8. Issue Service (`IssueService.java`)**
Handles business logic related to issues. Give it the following methods (you'll need to implement them).
```java

    public List<IssueDTO> getAllIssues() {
    }

    public Optional<IssueDTO> createIssue(Long userId, Issue issue) {
        
    }


```

---

### **9. User Controller (`UserController.java`)**
Exposes REST endpoints for user operations Get and Post. Keep above url's in mind.

Make sure to annotate the class with @CrossOrigin("*")

---

### **10. Issue Controller (`IssueController.java`)**
Exposes REST endpoints for user operations Get, Put and Post. Keep above url's in mind.

Make sure to annotate the class with @CrossOrigin("*")

---

### **11. Final Steps**

Almost done!

Create the schema in the database. Run content of the file `dummy.sql` on the database
Open the frontend.



