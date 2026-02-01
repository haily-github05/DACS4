package com.seleniumtest;

import java.util.List;
import java.util.Random;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

public class BookFlightTest extends BaseTest {

    void login() {
        driver.get("http://localhost:3000/login");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("email")))
                .sendKeys("hothihailybry@gmail.com");
        driver.findElement(By.name("password"))
                .sendKeys("123456");
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("type")));
    }

    @Test
    void testBookFlight() {

        login(); 

    wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("type")
    ));

    Select typeSelect = new Select(
            driver.findElement(By.id("type"))
    );
    typeSelect.selectByVisibleText("Một chiều");

    Select classSelect = new Select(
            driver.findElement(By.name("class"))
    );
    classSelect.selectByVisibleText("Phổ Thông");

    Select fromAirport = new Select(
            driver.findElement(By.id("departure_airport_id"))
    );
    fromAirport.selectByIndex(1);

    Select toAirport = new Select(
            driver.findElement(By.id("arrival_airport_id"))
    );
    toAirport.selectByIndex(2);

    WebElement departureDate = wait.until(
        ExpectedConditions.elementToBeClickable(By.id("departure_datetime"))
    );

        departureDate.click();
        departureDate.sendKeys(Keys.chord(Keys.COMMAND, "a")); // Mac
        departureDate.sendKeys("20/01/2026");
        departureDate.sendKeys(Keys.TAB);

   By searchBtn = By.xpath("//button[normalize-space()='Tìm kiếm']");
        
   WebElement btn = wait.until(
        ExpectedConditions.elementToBeClickable(searchBtn)
        );
        btn.click();

    wait.until(ExpectedConditions.urlContains("select-flight"));

    Assertions.assertTrue(
            driver.getCurrentUrl().contains("select-flight"),
            "❌ Không sang trang chọn chuyến bay"
    );

    By firstFlightBtn = By.xpath(
        "(//form[contains(@action,'booking-seat')]//button[@type='submit'])[1]"
        );

        WebElement flightBtn = wait.until(
                ExpectedConditions.elementToBeClickable(firstFlightBtn)
        );

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", flightBtn
        );

        flightBtn.click();

        String bookingClass = "Phổ Thông"; 

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("seats")));

        List<WebElement> availableSeats =
                driver.findElements(By.cssSelector("#seats .seat.available"));

        List<WebElement> validSeats = new java.util.ArrayList<>();

        for (WebElement seat : availableSeats) {
        String seatCode = seat.getText().trim();
        char row = seatCode.charAt(0);

        if (bookingClass.equals("Phổ Thông") && row >= 'E' && row <= 'J') {
                validSeats.add(seat);
        }

        if (bookingClass.equals("Thương Gia") && row >= 'A' && row <= 'D') {
                validSeats.add(seat);
        }
        }

        Assertions.assertFalse(
                validSeats.isEmpty(),
                "❌ Không có ghế trống phù hợp"
        );

        Random random = new Random();
        WebElement chosenSeat = validSeats.get(random.nextInt(validSeats.size()));

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", chosenSeat
        );
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].click();", chosenSeat
        );

        System.out.println("✅ Đã chọn ghế: " + chosenSeat.getText());

        WebElement bookBtn = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[contains(text(),'Đặt')]")
                )
        );

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", bookBtn
        );
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].click();", bookBtn
        );

        System.out.println("🎉 Đặt vé thành công");
        By bookBtn2 = By.id("bookFlight");

        WebElement btnDat = wait.until(
                ExpectedConditions.presenceOfElementLocated(bookBtn2)
        );

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", btnDat
        );

        wait.until(driver ->
                ((JavascriptExecutor) driver)
                        .executeScript("return document.readyState")
                        .equals("complete")
        );

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].click();", btnDat
        );

        By qrBtn = By.id("pay-button");

        WebElement btnQR = wait.until(
                ExpectedConditions.elementToBeClickable(qrBtn)
        );

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", btnQR
        );

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].click();", btnQR
        );

        sleep(1500);

        System.out.println("✅ Đã hiển thị mã QR");

        WebElement confirmCheckbox = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("confirm-checkbox"))
        );

        if (!confirmCheckbox.isSelected()) {
        confirmCheckbox.click();
        }


    }
    void sleep(long millis) {
    try {
        Thread.sleep(millis);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}

}


