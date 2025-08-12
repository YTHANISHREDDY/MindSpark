import { User, Subject } from "@/types";

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@bvrit.ac.in",
    role: "student",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@bvrit.ac.in",
    role: "student",
  },
];

export const subjects: Subject[] = [
  {
    id: "dsa-1",
    name: "Data Structures & Algorithms",
    description: "Learn about data structures and algorithms",
    icon: "📊",
    topics: [
      {
        id: "dsa-arrays",
        name: "Arrays & Strings",
        description: "Fundamental data structures for storing collections of elements",
        subjectId: "dsa-1",
        quizzes: [
          {
            id: "dsa-arrays-quiz-1",
            title: "Introduction to Arrays",
            description: "Basic concepts of arrays and operations",
            topicId: "dsa-arrays",
            timeLimit: 10,
            questions: [
              {
                id: "q1",
                text: "What is the time complexity of accessing an element in an array by index?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                correctAnswer: 0,
                explanation: "Array access by index is a constant time operation O(1)"
              },
              {
                id: "q2",
                text: "Which operation is NOT typically O(1) in an array?",
                options: ["Access by index", "Insertion at the beginning", "Access the last element", "Modifying an element"],
                correctAnswer: 1,
                explanation: "Insertion at the beginning requires shifting all elements, making it O(n)"
              },
              {
                id: "q3",
                text: "What happens when an array in most programming languages exceeds its capacity?",
                options: ["Elements are automatically truncated", "A new, larger array is allocated", "The program crashes", "Older elements are removed"],
                correctAnswer: 1,
                explanation: "Dynamic arrays allocate a new, larger array and copy the elements when capacity is exceeded"
              },
              {
                id: "q4",
                text: "Which of these is NOT an advantage of arrays over linked lists?",
                options: ["Better cache locality", "Random access", "Memory efficiency", "Dynamic size"],
                correctAnswer: 3,
                explanation: "Arrays typically have fixed size, while linked lists can grow dynamically"
              },
              {
                id: "q5",
                text: "In a zero-indexed array of size 5, what is the valid index range?",
                options: ["1 to 5", "0 to 4", "0 to 5", "1 to 4"],
                correctAnswer: 1,
                explanation: "Zero-indexed arrays with size n have valid indices from 0 to n-1"
              },
              {
                id: "q6",
                text: "Which sorting algorithm has the best average-case time complexity?",
                options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"],
                correctAnswer: 3,
                explanation: "Quick Sort has an average time complexity of O(n log n)"
              },
              {
                id: "q7",
                text: "What is the space complexity of an array with n elements?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
                correctAnswer: 1,
                explanation: "An array uses space proportional to the number of elements"
              },
              {
                id: "q8",
                text: "Which operation on arrays typically requires a full traversal?",
                options: ["Get element at index", "Set element at index", "Find an element by value", "Get array length"],
                correctAnswer: 2,
                explanation: "Finding an element by value requires checking each element until found"
              },
              {
                id: "q9",
                text: "What is the time complexity of inserting an element at the end of a dynamic array?",
                options: ["Always O(1)", "Always O(n)", "Amortized O(1)", "O(log n)"],
                correctAnswer: 2,
                explanation: "Inserting at the end is usually O(1) but occasionally requires resizing, making it amortized O(1)"
              },
              {
                id: "q10",
                text: "Which of these array operations is most efficient?",
                options: ["Inserting at the beginning", "Inserting at the end", "Deleting from the beginning", "Searching for an element"],
                correctAnswer: 1,
                explanation: "Inserting at the end is typically O(1) for dynamic arrays"
              }
            ]
          },
          {
            id: "dsa-strings-quiz-1",
            title: "String Manipulation",
            description: "Common string operations and algorithms",
            topicId: "dsa-arrays",
            timeLimit: 10,
            questions: [
              {
                id: "q1",
                text: "What is the time complexity of determining the length of a string in most languages?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                correctAnswer: 0,
                explanation: "String length is usually stored as a property, making it O(1)"
              },
              {
                id: "q2",
                text: "Which string matching algorithm has a worst-case time complexity of O(n*m)?",
                options: ["KMP Algorithm", "Boyer-Moore", "Rabin-Karp", "Naive string matching"],
                correctAnswer: 3,
                explanation: "Naive string matching has a worst-case of O(n*m) where n and m are string lengths"
              },
              {
                id: "q3",
                text: "What data structure is commonly used for efficient string searching?",
                options: ["Hash Table", "Binary Tree", "Trie", "Queue"],
                correctAnswer: 2,
                explanation: "Tries are specialized tree structures optimized for string operations"
              },
              {
                id: "q4",
                text: "In most programming languages, are strings mutable?",
                options: ["Yes, always", "No, never", "Depends on the implementation", "Only when explicitly declared"],
                correctAnswer: 1,
                explanation: "In most modern languages like Java, Python, and JavaScript, strings are immutable"
              },
              {
                id: "q5",
                text: "What is the space complexity of storing a string with n characters?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                correctAnswer: 1,
                explanation: "Space required is proportional to the number of characters"
              },
              {
                id: "q6",
                text: "Which operation is typically NOT efficient for strings?",
                options: ["Concatenation", "Access by index", "Length calculation", "Substring extraction"],
                correctAnswer: 0,
                explanation: "Concatenation often creates new string objects, making it inefficient for repeated operations"
              },
              {
                id: "q7",
                text: "What is the primary benefit of using StringBuilder/StringBuffer over String concatenation?",
                options: ["Better readability", "Thread safety", "Improved performance for multiple concatenations", "Lower memory usage"],
                correctAnswer: 2,
                explanation: "StringBuilder avoids creating multiple string objects during concatenation"
              },
              {
                id: "q8",
                text: "Which of these operations cannot be performed in O(1) time on strings?",
                options: ["Get character at index", "Check if empty", "Reverse the string", "Get length"],
                correctAnswer: 2,
                explanation: "Reversing requires O(n) operations to create a new reversed string"
              },
              {
                id: "q9",
                text: "What makes string comparison potentially expensive?",
                options: ["Hash calculation", "Character-by-character comparison", "Memory allocation", "Type conversion"],
                correctAnswer: 1,
                explanation: "String comparison often requires character-by-character comparison until a difference is found"
              },
              {
                id: "q10",
                text: "What is the time complexity of checking if a string contains a single character?",
                options: ["O(1)", "O(n)", "O(log n)", "Depends on the language"],
                correctAnswer: 1,
                explanation: "In the worst case, the entire string must be checked, making it O(n)"
              }
            ]
          }
        ]
      },
      {
        id: "dsa-linkedlist",
        name: "Linked Lists",
        description: "Dynamic data structures with nodes linked together",
        subjectId: "dsa-1",
        quizzes: [
          {
            id: "dsa-linkedlist-quiz-1",
            title: "Linked List Basics",
            description: "Fundamentals of linked list data structures",
            topicId: "dsa-linkedlist",
            timeLimit: 10,
            questions: [
              {
                id: "q1",
                text: "What is the time complexity of inserting at the beginning of a singly linked list?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                correctAnswer: 0,
                explanation: "Insertion at the beginning just requires updating the head pointer"
              },
              {
                id: "q2",
                text: "Which of these operations is faster in a linked list compared to an array?",
                options: ["Random access", "Traversing all elements", "Insertion at beginning", "Binary search"],
                correctAnswer: 2,
                explanation: "Linked lists excel at insertion at the beginning (O(1)) compared to arrays (O(n))"
              },
              {
                id: "q3",
                text: "What is the space overhead of a linked list compared to an array?",
                options: ["Less space", "Same space", "More space", "Depends on implementation"],
                correctAnswer: 2,
                explanation: "Linked lists require extra space for storing pointers/references"
              },
              {
                id: "q4",
                text: "What is a key disadvantage of a singly linked list?",
                options: ["Cannot be traversed", "Cannot insert elements", "Cannot be deleted", "Cannot traverse backwards"],
                correctAnswer: 3,
                explanation: "Singly linked lists can only be traversed in the forward direction"
              },
              {
                id: "q5",
                text: "Which operation requires O(n) time in a singly linked list?",
                options: ["Insertion at beginning", "Deletion from beginning", "Finding the middle element", "Checking if empty"],
                correctAnswer: 2,
                explanation: "Finding the middle element requires traversing half the list on average"
              },
              {
                id: "q6",
                text: "What is the primary advantage of a doubly linked list over a singly linked list?",
                options: ["Less memory usage", "Faster insertions", "Bidirectional traversal", "Better cache locality"],
                correctAnswer: 2,
                explanation: "Doubly linked lists allow traversal in both directions"
              },
              {
                id: "q7",
                text: "Which data structure would you use to implement an undo feature?",
                options: ["Array", "Singly linked list", "Stack (implemented with linked list)", "Binary tree"],
                correctAnswer: 2,
                explanation: "A stack (often implemented as a linked list) is ideal for undo operations"
              },
              {
                id: "q8",
                text: "What is the time complexity of deleting a node from the end of a singly linked list?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
                correctAnswer: 1,
                explanation: "Deleting from the end requires traversing to find the second-to-last node"
              },
              {
                id: "q9",
                text: "What problem does a circular linked list solve?",
                options: ["Reduced memory usage", "Continuous traversal", "Faster random access", "Better sorting performance"],
                correctAnswer: 1,
                explanation: "Circular linked lists allow continuous traversal without reaching an end"
              },
              {
                id: "q10",
                text: "Which of these is NOT a common application of linked lists?",
                options: ["Implementation of stacks and queues", "Symbol tables in compilers", "Image/video storage", "Hash table collision resolution"],
                correctAnswer: 2,
                explanation: "Images/videos typically use arrays for efficient memory access patterns"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "os-1",
    name: "Operating Systems",
    description: "Explore the concepts of operating systems",
    icon: "🖥️",
    topics: [
      {
        id: "os-processes",
        name: "Processes & Threads",
        description: "Learn about process management and threading",
        subjectId: "os-1",
        quizzes: [
          {
            id: "os-processes-quiz-1",
            title: "Process Management",
            description: "Fundamentals of OS process handling",
            topicId: "os-processes",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "What is the difference between a program and a process?",
                options: [
                  "They are the same thing", 
                  "A program is stored on disk while a process is an executing instance of a program", 
                  "A process is stored on disk while a program is running in memory", 
                  "A program can only have one process"
                ],
                correctAnswer: 1,
                explanation: "A program is a passive entity stored on disk, while a process is an active entity in memory with a program counter, stack, etc."
              },
              {
                id: "q2",
                text: "Which of the following is NOT typically part of a process control block?",
                options: ["Process ID", "Process State", "CPU Scheduling Information", "Source Code"],
                correctAnswer: 3,
                explanation: "Source code is not stored in the PCB; it contains runtime information about the process"
              },
              {
                id: "q3",
                text: "What is a thread in the context of operating systems?",
                options: [
                  "Another name for a process", 
                  "A lightweight process that shares memory with other threads in the same process", 
                  "A communication channel between processes", 
                  "A type of scheduling algorithm"
                ],
                correctAnswer: 1,
                explanation: "Threads are units of execution within a process that share the same memory space"
              },
              {
                id: "q4",
                text: "What happens during a context switch?",
                options: [
                  "The OS changes the display context for the user", 
                  "The current process state is saved and another process state is loaded", 
                  "The memory is completely cleared", 
                  "A new process is created"
                ],
                correctAnswer: 1,
                explanation: "Context switching involves saving the state of the current process and loading the saved state of another process"
              },
              {
                id: "q5",
                text: "Which of these is an advantage of multi-threading over multi-processing?",
                options: [
                  "Better security isolation", 
                  "More reliable execution", 
                  "Lower resource overhead", 
                  "Simpler programming model"
                ],
                correctAnswer: 2,
                explanation: "Threads share resources like memory space, resulting in lower overhead compared to separate processes"
              },
              {
                id: "q6",
                text: "What is CPU scheduling?",
                options: [
                  "Allocating CPU time to different processes", 
                  "Determining the CPU speed for processes", 
                  "Organizing CPU cache", 
                  "Managing CPU temperature"
                ],
                correctAnswer: 0,
                explanation: "CPU scheduling is the method by which CPU time is allocated to various processes"
              },
              {
                id: "q7",
                text: "Which scheduling algorithm gives the shortest job the highest priority?",
                options: ["Round Robin", "First-Come-First-Served", "Shortest Job First", "Priority Scheduling"],
                correctAnswer: 2,
                explanation: "Shortest Job First (SJF) scheduling selects the process with the smallest execution time"
              },
              {
                id: "q8",
                text: "What is thrashing in an operating system?",
                options: [
                  "When a process uses 100% CPU", 
                  "When a system spends more time paging than executing", 
                  "When multiple processes deadlock", 
                  "When a hard drive fails"
                ],
                correctAnswer: 1,
                explanation: "Thrashing occurs when the system spends more time swapping pages than executing instructions"
              },
              {
                id: "q9",
                text: "What is the purpose of the Process Control Block (PCB)?",
                options: [
                  "To display process information to users", 
                  "To store information about each process", 
                  "To control access to the CPU", 
                  "To manage the boot process"
                ],
                correctAnswer: 1,
                explanation: "The PCB stores all the information needed to keep track of a process, including its state and resources"
              },
              {
                id: "q10",
                text: "Which process state indicates that the process is currently using the CPU?",
                options: ["Ready", "Waiting", "Running", "Terminated"],
                correctAnswer: 2,
                explanation: "The Running state means the process is currently being executed by the CPU"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "dbms-1",
    name: "Database Management Systems",
    description: "Learn database concepts and SQL",
    icon: "🗄️",
    topics: [
      {
        id: "dbms-sql",
        name: "SQL Fundamentals",
        description: "Learn SQL query language basics",
        subjectId: "dbms-1",
        quizzes: [
          {
            id: "dbms-sql-quiz-1",
            title: "SQL Basics",
            description: "Test your knowledge of basic SQL commands",
            topicId: "dbms-sql",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which SQL command is used to retrieve data from a database?",
                options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
                correctAnswer: 1,
                explanation: "The SELECT statement is used to query and retrieve data from a database"
              },
              {
                id: "q2",
                text: "Which of the following is NOT a type of SQL join?",
                options: ["INNER JOIN", "OUTER JOIN", "CROSS JOIN", "SEQUENTIAL JOIN"],
                correctAnswer: 3,
                explanation: "SEQUENTIAL JOIN is not a standard SQL join type. The standard types include INNER, LEFT/RIGHT/FULL OUTER, and CROSS joins."
              },
              {
                id: "q3",
                text: "What does DDL stand for in SQL?",
                options: ["Data Definition Language", "Data Deletion Language", "Database Definition Language", "Data Description Logic"],
                correctAnswer: 0,
                explanation: "DDL (Data Definition Language) is used to define database structure with commands like CREATE, ALTER, DROP"
              },
              {
                id: "q4",
                text: "Which constraint is used to uniquely identify each row in a table?",
                options: ["UNIQUE", "NOT NULL", "CHECK", "PRIMARY KEY"],
                correctAnswer: 3,
                explanation: "PRIMARY KEY constraint uniquely identifies each record in a database table"
              },
              {
                id: "q5",
                text: "Which SQL clause is used to filter the results of a query?",
                options: ["HAVING", "GROUP BY", "WHERE", "ORDER BY"],
                correctAnswer: 2,
                explanation: "The WHERE clause filters records based on specified conditions"
              },
              {
                id: "q6",
                text: "What is the purpose of the GROUP BY clause?",
                options: [
                  "To sort the result set", 
                  "To group rows with the same values", 
                  "To filter groups based on conditions", 
                  "To join tables together"
                ],
                correctAnswer: 1,
                explanation: "GROUP BY groups rows that have the same values into summary rows"
              },
              {
                id: "q7",
                text: "Which SQL function returns the number of rows matching a specific condition?",
                options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
                correctAnswer: 2,
                explanation: "COUNT() returns the number of rows that match a specified criterion"
              },
              {
                id: "q8",
                text: "What is a foreign key?",
                options: [
                  "The main key for a table", 
                  "A key from a foreign country", 
                  "A field that points to a primary key in another table", 
                  "A key that is not used often"
                ],
                correctAnswer: 2,
                explanation: "A foreign key is a field that refers to the primary key in another table"
              },
              {
                id: "q9",
                text: "Which statement is used to add new data to a database?",
                options: ["ADD", "INSERT", "UPDATE", "CREATE"],
                correctAnswer: 1,
                explanation: "The INSERT statement is used to add new records to a table"
              },
              {
                id: "q10",
                text: "What does the HAVING clause do in SQL?",
                options: [
                  "Filters rows before grouping", 
                  "Filters groups after GROUP BY", 
                  "Sorts the result set", 
                  "Joins tables together"
                ],
                correctAnswer: 1,
                explanation: "HAVING filters groups based on specified conditions after GROUP BY has been applied"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cn-1",
    name: "Computer Networks",
    description: "Learn about networking concepts and protocols",
    icon: "🌐",
    topics: [
      {
        id: "cn-basics",
        name: "Network Fundamentals",
        description: "Basic concepts of computer networks",
        subjectId: "cn-1",
        quizzes: [
          {
            id: "cn-basics-quiz-1",
            title: "Introduction to Networks",
            description: "Test your knowledge of basic networking concepts",
            topicId: "cn-basics",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which layer is responsible for routing in the OSI model?",
                options: ["Network Layer", "Transport Layer", "Data Link Layer", "Physical Layer"],
                correctAnswer: 0,
                explanation: "The Network Layer (Layer 3) handles routing between networks"
              },
              {
                id: "q2",
                text: "What is the purpose of the ARP protocol?",
                options: ["Address Resolution Protocol", "Address Resolution Protocol", "Address Resolution Protocol", "Address Resolution Protocol"],
                correctAnswer: 0,
                explanation: "ARP is used to map IP addresses to MAC addresses"
              },
              {
                id: "q3",
                text: "What is the difference between TCP and UDP?",
                options: ["TCP is reliable and uses acknowledgments, while UDP is unreliable and does not use acknowledgments", "TCP is faster than UDP", "TCP is more secure than UDP", "TCP is used for streaming media while UDP is used for file transfer"],
                correctAnswer: 0,
                explanation: "TCP is reliable and uses acknowledgments, while UDP is unreliable and does not use acknowledgments"
              },
              {
                id: "q4",
                text: "What is the purpose of the DNS protocol?",
                options: ["Domain Name System", "Domain Name System", "Domain Name System", "Domain Name System"],
                correctAnswer: 0,
                explanation: "DNS is used to translate domain names into IP addresses"
              },
              {
                id: "q5",
                text: "What is the difference between a hub and a switch?",
                options: ["A hub broadcasts all incoming data to all connected devices, while a switch forwards data only to the intended destination", "A hub is faster than a switch", "A hub is more secure than a switch", "A hub is used for wired networks while a switch is used for wireless networks"],
                correctAnswer: 0,
                explanation: "A hub broadcasts all incoming data to all connected devices, while a switch forwards data only to the intended destination"
              },
              {
                id: "q6",
                text: "What is the purpose of the NAT (Network Address Translation) protocol?",
                options: ["Network Address Translation", "Network Address Translation", "Network Address Translation", "Network Address Translation"],
                correctAnswer: 0,
                explanation: "NAT is used to allow multiple devices on a private network to share a single public IP address"
              },
              {
                id: "q7",
                text: "What is the difference between a router and a switch?",
                options: ["A router forwards data packets based on IP addresses, while a switch forwards data packets based on MAC addresses", "A router is faster than a switch", "A router is more secure than a switch", "A router is used for wired networks while a switch is used for wireless networks"],
                correctAnswer: 0,
                explanation: "A router forwards data packets based on IP addresses, while a switch forwards data packets based on MAC addresses"
              },
              {
                id: "q8",
                text: "What is the purpose of the DHCP (Dynamic Host Configuration Protocol) protocol?",
                options: ["Dynamic Host Configuration Protocol", "Dynamic Host Configuration Protocol", "Dynamic Host Configuration Protocol", "Dynamic Host Configuration Protocol"],
                correctAnswer: 0,
                explanation: "DHCP is used to automatically assign IP addresses to devices on a network"
              },
              {
                id: "q9",
                text: "What is the difference between a VPN (Virtual Private Network) and a LAN (Local Area Network)?",
                options: ["A VPN is a private network that is connected to the internet, while a LAN is a private network that is not connected to the internet", "A VPN is faster than a LAN", "A VPN is more secure than a LAN", "A VPN is used for streaming media while a LAN is used for file transfer"],
                correctAnswer: 0,
                explanation: "A VPN is a private network that is connected to the internet, while a LAN is a private network that is not connected to the internet"
              },
              {
                id: "q10",
                text: "What is the purpose of the SSL/TLS protocol?",
                options: ["Secure Socket Layer/TLS", "Secure Socket Layer/TLS", "Secure Socket Layer/TLS", "Secure Socket Layer/TLS"],
                correctAnswer: 0,
                explanation: "SSL/TLS is used to encrypt data transmitted over the internet"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "oop-1",
    name: "Object-Oriented Programming",
    description: "Learn OOP concepts and principles",
    icon: "🎯",
    topics: [
      {
        id: "oop-basics",
        name: "OOP Fundamentals",
        description: "Core concepts of object-oriented programming",
        subjectId: "oop-1",
        quizzes: [
          {
            id: "oop-basics-quiz-1",
            title: "OOP Concepts",
            description: "Test your understanding of OOP principles",
            topicId: "oop-basics",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which principle of OOP allows a class to have multiple methods with the same name?",
                options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
                correctAnswer: 2,
                explanation: "Polymorphism allows methods to have the same name but different parameters"
              },
              {
                id: "q2",
                text: "What is the purpose of the constructor in OOP?",
                options: ["To initialize object properties", "To define object methods", "To create object instances", "To handle object destruction"],
                correctAnswer: 0,
                explanation: "The constructor is used to initialize object properties"
              },
              {
                id: "q3",
                text: "What is the difference between a static method and an instance method in OOP?",
                options: ["Static methods belong to the class and can be called without creating an instance of the class, while instance methods belong to an instance of the class and can only be called on an instance of the class", "Static methods are faster than instance methods", "Static methods are more secure than instance methods", "Static methods are used for static data while instance methods are used for instance data"],
                correctAnswer: 0,
                explanation: "Static methods belong to the class and can be called without creating an instance of the class, while instance methods belong to an instance of the class and can only be called on an instance of the class"
              },
              {
                id: "q4",
                text: "What is the purpose of the super() function in OOP?",
                options: ["To call the constructor of the parent class", "To call the destructor of the parent class", "To call the static method of the parent class", "To call the instance method of the parent class"],
                correctAnswer: 0,
                explanation: "The super() function is used to call the constructor of the parent class"
              },
              {
                id: "q5",
                text: "What is the purpose of the abstract class in OOP?",
                options: ["To define a blueprint for a class that cannot be instantiated on its own", "To define a class that can be instantiated on its own", "To define a class that can only be inherited from", "To define a class that can only be instantiated with specific parameters"],
                correctAnswer: 0,
                explanation: "The abstract class is used to define a blueprint for a class that cannot be instantiated on its own"
              },
              {
                id: "q6",
                text: "What is the purpose of the interface in OOP?",
                options: ["To define a set of methods that a class must implement", "To define a set of properties that a class must have", "To define a set of constants that a class must have", "To define a set of variables that a class must have"],
                correctAnswer: 0,
                explanation: "The interface is used to define a set of methods that a class must implement"
              },
              {
                id: "q7",
                text: "What is the purpose of the encapsulation in OOP?",
                options: ["To hide the internal implementation details of a class and expose only the necessary information", "To allow access to all class properties and methods", "To allow access to only a subset of class properties and methods", "To allow access to all class properties and methods through getter and setter methods"],
                correctAnswer: 0,
                explanation: "The encapsulation is used to hide the internal implementation details of a class and expose only the necessary information"
              },
              {
                id: "q8",
                text: "What is the purpose of the inheritance in OOP?",
                options: ["To allow a class to inherit properties and methods from another class", "To allow a class to inherit only specific properties and methods from another class", "To allow a class to inherit all properties and methods from another class", "To allow a class to inherit only specific properties and methods from another class"],
                correctAnswer: 0,
                explanation: "The inheritance is used to allow a class to inherit properties and methods from another class"
              },
              {
                id: "q9",
                text: "What is the purpose of the polymorphism in OOP?",
                options: ["To allow a class to have multiple implementations of the same method", "To allow a class to have multiple instances of the same method", "To allow a class to have multiple methods with the same name", "To allow a class to have multiple methods with different names"],
                correctAnswer: 0,
                explanation: "The polymorphism is used to allow a class to have multiple implementations of the same method"
              },
              {
                id: "q10",
                text: "What is the purpose of the abstraction in OOP?",
                options: ["To hide the complexity of a class and expose only the necessary information", "To allow access to all class properties and methods", "To allow access to only a subset of class properties and methods", "To allow access to all class properties and methods through getter and setter methods"],
                correctAnswer: 0,
                explanation: "The abstraction is used to hide the complexity of a class and expose only the necessary information"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "aiml-1",
    name: "AI & Machine Learning",
    description: "Explore artificial intelligence and machine learning concepts",
    icon: "🤖",
    topics: [
      {
        id: "ml-basics",
        name: "Machine Learning Basics",
        description: "Introduction to machine learning concepts",
        subjectId: "aiml-1",
        quizzes: [
          {
            id: "ml-basics-quiz-1",
            title: "ML Fundamentals",
            description: "Test your knowledge of basic ML concepts",
            topicId: "ml-basics",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which type of learning involves labeled data?",
                options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
                correctAnswer: 0,
                explanation: "Supervised learning uses labeled data to train models"
              },
              {
                id: "q2",
                text: "What is the purpose of the training phase in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 0,
                explanation: "The training phase is used to find the best parameters for the model"
              },
              {
                id: "q3",
                text: "What is the purpose of the testing phase in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 1,
                explanation: "The testing phase is used to test the model on new data"
              },
              {
                id: "q4",
                text: "What is the purpose of the validation phase in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 2,
                explanation: "The validation phase is used to evaluate the model's performance"
              },
              {
                id: "q5",
                text: "What is the purpose of the hyperparameter tuning in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 3,
                explanation: "The hyperparameter tuning is used to optimize the model's performance"
              },
              {
                id: "q6",
                text: "What is the purpose of the feature selection in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 4,
                explanation: "The feature selection is used to optimize the model's performance"
              },
              {
                id: "q7",
                text: "What is the purpose of the cross-validation in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 5,
                explanation: "The cross-validation is used to evaluate the model's performance"
              },
              {
                id: "q8",
                text: "What is the purpose of the ensemble learning in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 6,
                explanation: "The ensemble learning is used to optimize the model's performance"
              },
              {
                id: "q9",
                text: "What is the purpose of the neural network in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 7,
                explanation: "The neural network is used to optimize the model's performance"
              },
              {
                id: "q10",
                text: "What is the purpose of the decision tree in machine learning?",
                options: ["To find the best parameters for the model", "To test the model on new data", "To evaluate the model's performance", "To optimize the model's performance"],
                correctAnswer: 8,
                explanation: "The decision tree is used to optimize the model's performance"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "se-1",
    name: "Software Engineering",
    description: "Learn software development methodologies and practices",
    icon: "⚙️",
    topics: [
      {
        id: "sdlc",
        name: "Software Development Life Cycle",
        description: "Understanding the SDLC phases",
        subjectId: "se-1",
        quizzes: [
          {
            id: "sdlc-quiz-1",
            title: "SDLC Fundamentals",
            description: "Test your knowledge of software development processes",
            topicId: "sdlc",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which phase comes first in the traditional waterfall model?",
                options: ["Requirements", "Design", "Implementation", "Testing"],
                correctAnswer: 0,
                explanation: "Requirements gathering is the first phase in the waterfall model"
              },
              {
                id: "q2",
                text: "What is the purpose of the requirements gathering phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 0,
                explanation: "The requirements gathering phase is used to define the scope and objectives of the project"
              },
              {
                id: "q3",
                text: "What is the purpose of the design phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 1,
                explanation: "The design phase is used to design the system architecture"
              },
              {
                id: "q4",
                text: "What is the purpose of the implementation phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 2,
                explanation: "The implementation phase is used to implement the system"
              },
              {
                id: "q5",
                text: "What is the purpose of the testing phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 3,
                explanation: "The testing phase is used to test the system"
              },
              {
                id: "q6",
                text: "What is the purpose of the maintenance phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 4,
                explanation: "The maintenance phase is used to maintain the system"
              },
              {
                id: "q7",
                text: "What is the purpose of the deployment phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 5,
                explanation: "The deployment phase is used to deploy the system"
              },
              {
                id: "q8",
                text: "What is the purpose of the release phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 6,
                explanation: "The release phase is used to release the system"
              },
              {
                id: "q9",
                text: "What is the purpose of the rollback phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 7,
                explanation: "The rollback phase is used to rollback the system"
              },
              {
                id: "q10",
                text: "What is the purpose of the rework phase in software development?",
                options: ["To define the scope and objectives of the project", "To design the system architecture", "To implement the system", "To test the system"],
                correctAnswer: 8,
                explanation: "The rework phase is used to rework the system"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "webdev-1",
    name: "Web Development",
    description: "Master web development technologies and practices",
    icon: "🌐",
    topics: [
      {
        id: "frontend",
        name: "Frontend Development",
        description: "Learn frontend web development",
        subjectId: "webdev-1",
        quizzes: [
          {
            id: "frontend-quiz-1",
            title: "Frontend Basics",
            description: "Test your knowledge of frontend development",
            topicId: "frontend",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which HTML element is used to create a link?",
                options: ["<a>", "<link>", "<href>", "<url>"],
                correctAnswer: 0,
                explanation: "The <a> tag is used to create hyperlinks in HTML"
              },
              {
                id: "q2",
                text: "What is the purpose of the <head> tag in HTML?",
                options: ["To define the content of the HTML document", "To define the styles of the HTML document", "To define the scripts of the HTML document", "To define the meta-information of the HTML document"],
                correctAnswer: 3,
                explanation: "The <head> tag is used to define the meta-information of the HTML document"
              },
              {
                id: "q3",
                text: "What is the purpose of the <body> tag in HTML?",
                options: ["To define the content of the HTML document", "To define the styles of the HTML document", "To define the scripts of the HTML document", "To define the meta-information of the HTML document"],
                correctAnswer: 0,
                explanation: "The <body> tag is used to define the content of the HTML document"
              },
              {
                id: "q4",
                text: "What is the purpose of the <div> tag in HTML?",
                options: ["To define a division or section in the HTML document", "To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 0,
                explanation: "The <div> tag is used to define a division or section in the HTML document"
              },
              {
                id: "q5",
                text: "What is the purpose of the <span> tag in HTML?",
                options: ["To define a division or section in the HTML document", "To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 1,
                explanation: "The <span> tag is used to define a span of text in the HTML document"
              },
              {
                id: "q6",
                text: "What is the purpose of the <img> tag in HTML?",
                options: ["To define an image in the HTML document", "To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 0,
                explanation: "The <img> tag is used to define an image in the HTML document"
              },
              {
                id: "q7",
                text: "What is the purpose of the <input> tag in HTML?",
                options: ["To define an input field in the HTML document", "To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 0,
                explanation: "The <input> tag is used to define an input field in the HTML document"
              },
              {
                id: "q8",
                text: "What is the purpose of the <button> tag in HTML?",
                options: ["To define a button in the HTML document", "To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 0,
                explanation: "The <button> tag is used to define a button in the HTML document"
              },
              {
                id: "q9",
                text: "What is the purpose of the <form> tag in HTML?",
                options: ["To define a form in the HTML document", "To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 0,
                explanation: "The <form> tag is used to define a form in the HTML document"
              },
              {
                id: "q10",
                text: "What is the purpose of the <table> tag in HTML?",
                options: ["To define a table in the HTML document", "To define a list in the HTML document", "To define a form in the HTML document", "To define a form in the HTML document"],
                correctAnswer: 0,
                explanation: "The <table> tag is used to define a table in the HTML document"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cloud-1",
    name: "Cloud & Cybersecurity",
    description: "Explore cloud computing and security concepts",
    icon: "☁️",
    topics: [
      {
        id: "cloud-basics",
        name: "Cloud Computing Fundamentals",
        description: "Basic concepts of cloud computing",
        subjectId: "cloud-1",
        quizzes: [
          {
            id: "cloud-quiz-1",
            title: "Cloud Computing Basics",
            description: "Test your knowledge of cloud computing",
            topicId: "cloud-basics",
            timeLimit: 15,
            questions: [
              {
                id: "q1",
                text: "Which service model provides virtual machines in the cloud?",
                options: ["IaaS", "PaaS", "SaaS", "FaaS"],
                correctAnswer: 0,
                explanation: "Infrastructure as a Service (IaaS) provides virtual machines and other infrastructure resources"
              },
              {
                id: "q2",
                text: "What is the purpose of the cloud computing model?",
                options: ["To provide scalable and flexible computing resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 0,
                explanation: "The cloud computing model provides scalable and flexible computing resources"
              },
              {
                id: "q3",
                text: "What is the purpose of the cloud storage model?",
                options: ["To provide scalable and flexible storage solutions", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 1,
                explanation: "The cloud storage model provides secure and reliable storage solutions"
              },
              {
                id: "q4",
                text: "What is the purpose of the cloud networking model?",
                options: ["To provide scalable and flexible networking resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 2,
                explanation: "The cloud networking model provides reliable and efficient communication networks"
              },
              {
                id: "q5",
                text: "What is the purpose of the cloud security model?",
                options: ["To provide scalable and flexible security resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 3,
                explanation: "The cloud security model provides reliable and efficient data processing"
              },
              {
                id: "q6",
                text: "What is the purpose of the cloud computing model?",
                options: ["To provide scalable and flexible computing resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 0,
                explanation: "The cloud computing model provides scalable and flexible computing resources"
              },
              {
                id: "q7",
                text: "What is the purpose of the cloud storage model?",
                options: ["To provide scalable and flexible storage solutions", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 1,
                explanation: "The cloud storage model provides secure and reliable storage solutions"
              },
              {
                id: "q8",
                text: "What is the purpose of the cloud networking model?",
                options: ["To provide scalable and flexible networking resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 2,
                explanation: "The cloud networking model provides reliable and efficient communication networks"
              },
              {
                id: "q9",
                text: "What is the purpose of the cloud security model?",
                options: ["To provide scalable and flexible security resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 3,
                explanation: "The cloud security model provides reliable and efficient data processing"
              },
              {
                id: "q10",
                text: "What is the purpose of the cloud computing model?",
                options: ["To provide scalable and flexible computing resources", "To provide secure and reliable storage solutions", "To provide reliable and efficient communication networks", "To provide reliable and efficient data processing"],
                correctAnswer: 0,
                explanation: "The cloud computing model provides scalable and flexible computing resources"
              }
            ]
          }
        ]
      }
    ]
  }
];
