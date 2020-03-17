package com.shop.med;

import com.shop.med.utils.IdWorker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication()
@EntityScan(value = "com.shop.med")
public class MedShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(MedShopApplication.class,args);
    }

    @Bean
    public IdWorker idWorker(){
        return new IdWorker();
    }
}
