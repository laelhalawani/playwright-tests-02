import { test, expect } from '@playwright/test';


test('Suggested products in cart drawer', async ({ page }) => {
  await page.goto('/');
  //unroll cart drawer
  let cartButton = await page.locator('p-header-minicart svg');
  await cartButton.click();
  //locator for product columns
  let suggestedProducts = await page.locator('div:nth-child(2) > .col-12'); 
  //get a link with class="o-product-card__blocklink ng-star-inserted" 
  let suggestedProductCards = await suggestedProducts.locator('p-productcard').all();
  //there should be 4 products
  let p1 = await suggestedProductCards[0];
  let p2 = await suggestedProductCards[1];
  let p3 = await suggestedProductCards[2];
  let p4 = await suggestedProductCards[3];
  //expect them to be visible
  await expect(p1).toBeVisible();
  await expect(p2).toBeVisible();
  await expect(p3).toBeVisible();
  await expect(p4).toBeVisible();
  //expect them to have href
  for (let el of suggestedProductCards) {
    //get the href
    let link = await el.locator('a')
    let url = await link.getAttribute('href');
    //check href if it's a product
    await expect(url).not.toBeNull();
    //await expect(url).toContain('/product/');
    //click
    await link.click({button: 'middle'});
    await page.waitForTimeout(1000);
    //expect url not to be null
    //expect the loaded address to include product
    
  }
  //get all pages
  let pages = page.context().pages();
  //check that no page has 404 in url
  for (let i=0; i<pages.length; i++) {
    let curPage = pages[i];
    //check for all tabs except the first (0)
    if(i>0) {
    //make sure 404 is not in the url
    await expect(curPage).not.toHaveURL(/.*404/);
    await curPage.waitForTimeout(1000);
    //aditional potential checks
    //await expect.soft(curPage).toHaveURL(/.*product/);
    //await expect.soft(curPage).toHaveURL(/.*nosto/);
    }

  }

  
});