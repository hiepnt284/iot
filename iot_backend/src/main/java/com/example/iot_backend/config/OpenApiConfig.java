package com.example.iot_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "HiepNT",
                        email = "hiepyolo02@gmail.com",
                        url = "https://github.com/hiepnt284"
                ),
                description = "OpenApi doc",
                title = "OpenApi",
                version = "1,0",
                license = @License(
                        name = "license name",
                        url = "https://some-url.com"
                ),
                termsOfService = "terms of service"
        ),
        servers = {
                @Server(
                        description = "Local Env",
                        url = "https://localhost:8081"
                ),
                @Server(
                        description = "Product Env",
                        url = "https://some-url.com"
                )
        }
)
public class OpenApiConfig {
}
