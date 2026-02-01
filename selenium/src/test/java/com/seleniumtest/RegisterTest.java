package com.seleniumtest;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class RegisterTest {

    WebDriver driver;

    @BeforeEach
    void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.get("http://localhost:3000/register");
    }

    @Test
    void testRegisterSuccess() {

        driver.findElement(By.name("firstName")).sendKeys("Ly");

        driver.findElement(By.name("lastName")).sendKeys("Ho");

        driver.findElement(By.name("email"))
                .sendKeys("lyho@gmail.com");

        driver.findElement(By.name("phoneNumber")).sendKeys("0123456789");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        WebElement dob = driver.findElement(By.name("dob"));
        js.executeScript(
            "arguments[0].value='2002-02-20'; arguments[0].dispatchEvent(new Event('change'));",
            dob
        );

        driver.findElement(By.name("password")).sendKeys("123456");

        driver.findElement(By.name("cpassword")).sendKeys("123456");

        WebElement checkbox = driver.findElement(By.id("form2Example3"));
        js.executeScript("arguments[0].click();", checkbox);

        WebElement submitBtn = driver.findElement(By.name("signup"));
        js.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
        js.executeScript("arguments[0].click();", submitBtn);
    }


    @AfterEach
    void tearDown() {
        // driver.quit();
    }
}
