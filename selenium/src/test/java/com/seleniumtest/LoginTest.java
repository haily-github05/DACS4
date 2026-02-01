package com.seleniumtest;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginTest extends BaseTest {

    @Test
    void testLoginSuccess() {

        driver.get("http://localhost:3000/login");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("email")))
                .sendKeys("hothihailybry@gmail.com");

        driver.findElement(By.name("password"))
                .sendKeys("123456");

        driver.findElement(By.cssSelector("button[type='submit']")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("type")));

        Assertions.assertTrue(
                driver.getCurrentUrl().contains("dashboard")
                        || driver.findElements(By.id("type")).size() > 0,
                "❌ Login thất bại"
        );
    }
}
