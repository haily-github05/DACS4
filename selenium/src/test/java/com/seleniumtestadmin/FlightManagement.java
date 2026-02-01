package com.seleniumtestadmin;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import io.github.bonigarcia.wdm.WebDriverManager;

public class FlightManagement {

    WebDriver driver;

    @BeforeEach
    void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.get("http://localhost:3000/admin/manage-flights");
    }

    @Test
    void testCreateFlight() {

        new Select(driver.findElement(By.id("departure_airport_id")))
                .selectByIndex(1);

        new Select(driver.findElement(By.id("arrival_airport_id")))
                .selectByIndex(2);

        new Select(driver.findElement(By.id("airline_id")))
                .selectByIndex(1);

        JavascriptExecutor js = (JavascriptExecutor) driver;

        js.executeScript(
            "document.getElementById('departure_datetime').value='2026-02-01T20:26';"
        );
        js.executeScript(
            "document.getElementById('arrival_datetime').value='2026-02-01T22:26';"
        );

        driver.findElement(By.id("economy_price")).sendKeys("1500000");
        driver.findElement(By.id("business_price")).sendKeys("3000000");

        js.executeScript(
            "document.getElementById('createFlight').scrollIntoView(true);"
        );
        js.executeScript(
            "document.getElementById('createFlight').click();"
        );
    }

    @AfterEach
    void tearDown() {

    }
}
