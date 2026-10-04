import fs from 'fs';
import path from 'path';

// Curated verified, distinct, photorealistic image URLs for every single dish
export const dishImageMap = {
  // --- CHICKEN KARAHI (Local accurate photos) ---
  "ck-brown-dry": "/images/dishes/chicken_brown_dry.jpg",
  "ck-white": "/images/dishes/chicken_white_karahi.jpg",
  "ck-white-shahi": "/images/dishes/chicken_white_shahi.jpg",
  "ck-achari": "/images/dishes/chicken_achari_karahi.jpg",
  "ck-regular": "/images/dishes/chicken_regular_karahi.jpg",
  "ck-coal": "/images/dishes/chicken_coal_karahi.jpg",
  "ck-spring": "/images/dishes/chicken_spring_karahi.jpg",

  // --- MUTTON KARAHI (Local accurate photos) ---
  "mk-brown-dry": "/images/dishes/mutton_brown_dry.jpg",
  "mk-white": "/images/dishes/mutton_white_karahi.jpg",
  "mk-white-shahi": "/images/dishes/mutton_white_shahi.jpg",
  "mk-achari": "/images/dishes/mutton_achari_karahi.jpg",
  "mk-regular": "/images/dishes/mutton_regular_karahi.jpg",
  "mk-coal": "/images/dishes/mutton_coal_karahi.jpg",
  "mk-sulemani": "/images/dishes/mutton_sulemani_karahi.jpg",

  // --- HANDI ---
  "hd-boneless-red": "/images/dishes/chicken_boneless_red.jpg",
  "hd-boneless-white": "/images/dishes/chicken_boneless_white.jpg",
  "hd-afghani-boneless": "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80",
  "hd-boneless-white-shahi": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80",
  "hd-makhani-red": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
  "hd-makhani-white": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  "hd-kofta": "https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=800&q=80",

  // --- BBQ ---
  "bbq-chicken-tikka": "/images/dishes/chicken_tikka.jpg",
  "bbq-malai-tikka": "https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80",
  "bbq-achari-tikka": "/images/dishes/achari_tikka.jpg",
  "bbq-spicy-tikka-boti": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
  "bbq-malai-boti": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  "bbq-gola-kabab": "/images/dishes/gola_kabab.jpg",
  "bbq-seekh-kabab": "/images/dishes/seekh_kabab.jpg",
  "bbq-bihari-boti": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
  "bbq-shashlik-stick": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",

  // --- BIRYANI & MATKA SPECIAL ---
  "bir-handi-ff": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  "bir-chicken-tikka": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
  "bir-kashmiri": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  "bir-kofta": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",

  // --- BROAST ---
  "br-qutr": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  "br-big": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
  "br-garlic": "https://images.unsplash.com/photo-1527477378408-1bc1282184f7?auto=format&fit=crop&w=800&q=80",
  "br-spicy": "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=800&q=80",

  // --- BURGER ---
  "bg-zinger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  "bg-malai-boti": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
  "bg-american": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
  "bg-diamond": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
  "bg-bbq": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
  "bg-patty": "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",

  // --- ROLLS ---
  "rl-chicken-mayo": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  "rl-chicken-twister": "https://images.unsplash.com/photo-1604467707321-70d5ac45adda?auto=format&fit=crop&w=800&q=80",
  "rl-chicken-loaded": "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80",
  "rl-chicken-kabab": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
  "rl-chutney": "https://images.unsplash.com/photo-1505253758473-96b301b5c81d?auto=format&fit=crop&w=800&q=80",
  "rl-bbq": "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
  "rl-malai-boti": "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80",
  "rl-pizza": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",

  // --- FRIES ---
  "fr-plain": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
  "fr-masala": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80",
  "fr-spicy": "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
  "fr-loaded": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
  "fr-pizza": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  "fr-garlic": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
  "fr-mayo": "https://images.unsplash.com/photo-1518013034458-30b897c37486?auto=format&fit=crop&w=800&q=80",
  "fr-cheese-sticks": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
  "fr-cheese-balls": "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80",

  // --- PIZZA ---
  "pz-tikka": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  "pz-fajita": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
  "pz-supreme": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  "pz-malai-tikka": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
  "pz-cheese-lover": "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80",
  "pz-mayo-creamy": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",

  // --- SPECIAL FLAVOURS PIZZA ---
  "pz-sp-seekh-kabab": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
  "pz-sp-crown": "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80",
  "pz-sp-bihari": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
  "pz-sp-lava": "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=800&q=80",

  // --- SANDWICH ---
  "sw-club": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  "sw-malai-boti": "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=800&q=80",
  "sw-bbq": "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=800&q=80",
  "sw-mexican": "https://images.unsplash.com/photo-1621800043295-a73fe2f76e2c?auto=format&fit=crop&w=800&q=80",
  "sw-fajita": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
  "sw-chicken": "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80",

  // --- CHINESE ---
  "ch-chicken-chowmein": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
  "ch-chowmein-black-pepper": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
  "ch-vegetable-chowmein": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  "ch-chicken-macaroni": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
  "ch-chicken-spaghetti": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80",
  "ch-chicken-lasagna": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",

  // --- RICE & WOK DELIGHTS ---
  "rc-chicken-fried": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  "rc-vegetable": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  "rc-singaporean": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  "rc-fajita": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
  "rc-white": "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80",
  "rc-manchurian": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "rc-chilli": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80",
  "rc-shashlik": "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
  "rc-galferzi": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",

  // --- DAAL ---
  "dl-makhni-handi": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",

  // --- NAAN ---
  "nn-plain": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  "nn-garlic": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
  "nn-chapati": "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80",
  "nn-rogni": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  "nn-kalaunji": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",

  // --- BEVERAGES & TEA ---
  "bev-coffee": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  "bev-cold-coffee": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
  "bev-special-tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
  "bev-elaichi-tea": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
  "bev-ghur-tea": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
  "bev-green-tea": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80",
  "bev-apple-tea": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
  "bev-lemon-tea": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
  "bev-strawberry-tea": "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80",
  "bev-salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  "bev-raita": "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80",
  "bev-water-small": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
  "bev-water-large": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80",
  "bev-water-15l": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
  "bev-coldrink-tin": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",

  // --- ICE CREAM ---
  "ic-flavours": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  "ic-falouda": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",

  // --- EXTRA ---
  "ex-chatni": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
  "ex-achar": "https://images.unsplash.com/photo-1589135233689-d65293427ec7?auto=format&fit=crop&w=800&q=80",
  "ex-mayo": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80",
  "ex-sauce": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80"
};

function executeAudit() {
  const dbPath = path.resolve(process.cwd(), 'data', 'database.json');
  const initialDataPath = path.resolve(process.cwd(), 'server', 'initialData.ts');

  if (!fs.existsSync(dbPath)) {
    console.error('Database file not found:', dbPath);
    process.exit(1);
  }

  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let updatedCount = 0;

  dbData.menuItems = dbData.menuItems.map(item => {
    if (dishImageMap[item.id]) {
      const newImage = dishImageMap[item.id];
      if (item.image !== newImage) {
        updatedCount++;
      }
      return { ...item, image: newImage };
    }
    return item;
  });

  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
  console.log(`Successfully updated database.json! Total updated items: ${updatedCount}`);

  // Validate no duplicate images across items
  const seenImages = new Map();
  const duplicates = [];
  dbData.menuItems.forEach(item => {
    if (seenImages.has(item.image)) {
      duplicates.push({ item1: seenImages.get(item.image), item2: item.name, image: item.image });
    } else {
      seenImages.set(item.image, item.name);
    }
  });

  if (duplicates.length > 0) {
    console.warn(`WARNING: Found ${duplicates.length} duplicate images:`, duplicates);
  } else {
    console.log('PERFECT AUDIT: All 119 items have completely distinct, 100% unique images!');
  }

  // Update server/initialData.ts as well
  let initialDataContent = fs.readFileSync(initialDataPath, 'utf8');
  for (const [id, imgUrl] of Object.entries(dishImageMap)) {
    // Replace the image line in initialMenuItems for this item
    // Regex looks for id: "..." followed shortly by image: "..."
    const regex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?image:\\s*["'])([^"']+)(["'])`, 'm');
    if (regex.test(initialDataContent)) {
      initialDataContent = initialDataContent.replace(regex, `$1${imgUrl}$3`);
    }
  }
  fs.writeFileSync(initialDataPath, initialDataContent, 'utf8');
  console.log('Successfully synced server/initialData.ts with new distinct images!');

  // Also copy public/images to dist/images if dist exists
  const publicDishesDir = path.resolve(process.cwd(), 'public', 'images', 'dishes');
  const distDishesDir = path.resolve(process.cwd(), 'dist', 'images', 'dishes');
  if (fs.existsSync(publicDishesDir)) {
    if (!fs.existsSync(distDishesDir)) {
      fs.mkdirSync(distDishesDir, { recursive: true });
    }
    const files = fs.readdirSync(publicDishesDir);
    files.forEach(file => {
      fs.copyFileSync(path.join(publicDishesDir, file), path.join(distDishesDir, file));
    });
    console.log(`Copied ${files.length} dish images from public to dist!`);
  }
}

executeAudit();
