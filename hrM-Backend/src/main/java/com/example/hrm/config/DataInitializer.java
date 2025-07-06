package com.example.hrm.config;

import com.example.hrm.model.Department;
import com.example.hrm.model.Employee;
import com.example.hrm.model.Role;
import com.example.hrm.model.User;
import com.example.hrm.repo.DepartmentRepository;
import com.example.hrm.repo.EmployeeRepository;
import com.example.hrm.repo.RoleRepository;
import com.example.hrm.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            DepartmentRepository departmentRepository,
            RoleRepository roleRepository,
            EmployeeRepository employeeRepository,
            UserRepository userRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        
        return args -> {
            // Clear existing data
            employeeRepository.deleteAll();
            departmentRepository.deleteAll();
            roleRepository.deleteAll();
            userRepository.deleteAll();

            // Create Departments
            Department hrDept = new Department("Human Resources", "Manages employee relations and recruitment");
            Department itDept = new Department("Information Technology", "Handles software development and IT infrastructure");
            Department financeDept = new Department("Finance", "Manages company finances and accounting");
            Department marketingDept = new Department("Marketing", "Handles marketing and sales operations");

            hrDept = departmentRepository.save(hrDept);
            itDept = departmentRepository.save(itDept);
            financeDept = departmentRepository.save(financeDept);
            marketingDept = departmentRepository.save(marketingDept);

            // Create Roles
            Role managerRole = new Role("Manager", "Department manager with supervisory responsibilities");
            Role developerRole = new Role("Software Developer", "Develops software applications");
            Role analystRole = new Role("Business Analyst", "Analyzes business requirements and processes");
            Role hrSpecialistRole = new Role("HR Specialist", "Handles recruitment and employee relations");
            Role accountantRole = new Role("Accountant", "Manages financial records and reporting");

            managerRole = roleRepository.save(managerRole);
            developerRole = roleRepository.save(developerRole);
            analystRole = roleRepository.save(analystRole);
            hrSpecialistRole = roleRepository.save(hrSpecialistRole);
            accountantRole = roleRepository.save(accountantRole);

            // Create Employees
            Employee emp1 = new Employee(
                "John", "Doe", "john.doe@company.com", "+1-555-0101",
                LocalDate.of(2020, 3, 15), 75000.0, hrDept, managerRole
            );

            Employee emp2 = new Employee(
                "Jane", "Smith", "jane.smith@company.com", "+1-555-0102",
                LocalDate.of(2021, 6, 20), 85000.0, itDept, developerRole
            );

            Employee emp3 = new Employee(
                "Mike", "Johnson", "mike.johnson@company.com", "+1-555-0103",
                LocalDate.of(2019, 11, 8), 65000.0, financeDept, accountantRole
            );

            Employee emp4 = new Employee(
                "Sarah", "Wilson", "sarah.wilson@company.com", "+1-555-0104",
                LocalDate.of(2022, 1, 10), 70000.0, marketingDept, analystRole
            );

            Employee emp5 = new Employee(
                "David", "Brown", "david.brown@company.com", "+1-555-0105",
                LocalDate.of(2021, 9, 5), 60000.0, hrDept, hrSpecialistRole
            );

            Employee emp6 = new Employee(
                "Lisa", "Davis", "lisa.davis@company.com", "+1-555-0106",
                LocalDate.of(2020, 7, 12), 80000.0, itDept, developerRole
            );

            employeeRepository.save(emp1);
            employeeRepository.save(emp2);
            employeeRepository.save(emp3);
            employeeRepository.save(emp4);
            employeeRepository.save(emp5);
            employeeRepository.save(emp6);

            // Create Users with different roles
            User adminUser = new User("admin", passwordEncoder.encode("admin123"), "admin@company.com", "ROLE_ADMIN");
            User hrUser = new User("hr", passwordEncoder.encode("hr123"), "hr@company.com", "ROLE_HR");
            User managerUser = new User("manager", passwordEncoder.encode("manager123"), "manager@company.com", "ROLE_MANAGER");
            User employeeUser = new User("employee", passwordEncoder.encode("employee123"), "employee@company.com", "ROLE_EMPLOYEE");

            userRepository.save(adminUser);
            userRepository.save(hrUser);
            userRepository.save(managerUser);
            userRepository.save(employeeUser);

            System.out.println("✅ Sample data initialized successfully!");
            System.out.println("📊 Created: " + departmentRepository.count() + " departments, " + 
                             roleRepository.count() + " roles, " + employeeRepository.count() + " employees, " +
                             userRepository.count() + " users");
            System.out.println("🔐 Test Users:");
            System.out.println("   - admin/admin123 (ROLE_ADMIN)");
            System.out.println("   - hr/hr123 (ROLE_HR)");
            System.out.println("   - manager/manager123 (ROLE_MANAGER)");
            System.out.println("   - employee/employee123 (ROLE_EMPLOYEE)");
        };
    }
} 