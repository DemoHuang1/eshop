package com.shop.med.utils;

import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyWebConfigurer implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String userPath = System.getProperty("user.home");;
        String path = "file:"+userPath+"/images/";
        LogFactory.getLog("mylog").warn("addResourceHandlers:"+path);
        registry.addResourceHandler("/images/**").addResourceLocations(path).addResourceLocations("classpath:/static/images/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:index");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}
