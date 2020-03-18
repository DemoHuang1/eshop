package com.shop.med;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(value = "com.shop.med")
public class MedShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(MedShopApplication.class,args);
    }


}
