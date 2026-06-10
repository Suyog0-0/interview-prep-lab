import type { InterviewSection } from "../../types";

export const s16_system_design: InterviewSection = {
  id: "system-design",
  slug: "system-design",
  title: "System Design & Architecture",
  subtitle: "Scalability, Databases, Microservices",
  color: "#f97316", // Orange
  questions: [
    {
      id: "s16-q01",
      q: "What is a Load Balancer?",
      hint: "Distributes incoming traffic.",
      answer: "A load balancer acts as the 'traffic cop' sitting in front of your servers, routing client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization.",
    },
    {
      id: "s16-q02",
      q: "Explain the CAP Theorem.",
      hint: "Consistency, Availability, Partition Tolerance.",
      answer: "The CAP Theorem states that a distributed database system can only guarantee two out of these three characteristics: Consistency (all nodes see the same data), Availability (every request receives a response), and Partition tolerance (system continues despite network failures).",
    },
    {
      id: "s16-q03",
      q: "SQL vs NoSQL Databases?",
      hint: "Relational/Structured vs Non-relational/Flexible.",
      answer: "SQL databases are table-based and use structured query language (good for complex queries, ACID transactions). NoSQL databases are document/key-value/graph-based and offer flexible schemas (good for rapid scaling, unstructured data).",
    },
    {
      id: "s16-q04",
      q: "What is Database Sharding?",
      hint: "Horizontal scaling of a database.",
      answer: "Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards. It splits rows across multiple tables/servers.",
    },
    {
      id: "s16-q05",
      q: "Microservices vs Monolith?",
      hint: "Independent components vs single unified unit.",
      answer: "A monolithic architecture is built as one large system and is usually one code-base. A microservices architecture splits the application into smaller, completely independent components that communicate over APIs.",
    }
  ],
  mcqs: [
    {
      id: "s16-m01",
      question: "Which of the following is an in-memory data structure store, used as a database, cache, and message broker?",
      options: ["PostgreSQL", "Redis", "MongoDB", "Cassandra"],
      correctAnswerIndex: 1,
      explanation: "Redis is an open source, in-memory data structure store often used as a distributed, in-memory key–value database, cache and message broker."
    },
    {
      id: "s16-m02",
      question: "In the context of scaling, what does 'Horizontal Scaling' mean?",
      options: [
        "Upgrading the CPU and RAM of an existing server",
        "Adding more servers to your pool of resources",
        "Refactoring code to run faster",
        "Switching from a relational to a NoSQL database"
      ],
      correctAnswerIndex: 1,
      explanation: "Horizontal scaling (scaling out) implies adding more machines into your pool of resources. Vertical scaling (scaling up) implies adding more power (CPU, RAM) to an existing machine."
    },
    {
      id: "s16-m03",
      question: "Which pattern is commonly used to prevent a service from being overwhelmed with requests and to fail gracefully?",
      options: ["Singleton", "Circuit Breaker", "Factory", "Observer"],
      correctAnswerIndex: 1,
      explanation: "The Circuit Breaker pattern is used to detect failures and encapsulates the logic of preventing a failure from constantly recurring, allowing the system to recover or fail gracefully."
    }
  ]
};
