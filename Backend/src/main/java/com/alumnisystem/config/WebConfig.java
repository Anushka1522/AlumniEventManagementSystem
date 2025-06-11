package com.alumnisystem.config;
//
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}



//@Configuration
//public class WebConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("*") // Allow all origins (or specify specific ones like "http://localhost:3000")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
//}

//@Configuration
//public class WebConfig 
//{
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                .allowedOrigins("*") // Allow all origins (or specify specific ones like "http://localhost:3000")
//                    //.allowedOriginPatterns("*") // ✅ wildcard allowed
//                    .allowedOrigins("http://localhost:[*]")
//                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
//            }
//        };
//    }
//}

  
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:5173")
//                .allowedMethods("*");
//    }
//}
//
//
/*.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"): This is more secure and clear than "*" for methods.

.allowedHeaders("*"): Allows any custom headers like Content-Type, Authorization, etc.

.allowCredentials(true): Necessary if you're using credentials (cookies or headers with tokens).

*/ 