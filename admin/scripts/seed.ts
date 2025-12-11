import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

// const STORE_USER_ID = process.env.SEED_USER_ID || "seed-user";

// async function main() {
  // Create store
  // const store = await database.store.create({
  //   data: {
  //     name: "Sample Store",
  //     userId: STORE_USER_ID,
  //   },
  // });

  // // Create billboard
  // Прямая ссылка на картинку из Google Drive
  // const billboardImageUrl =
  //   "https://drive.google.com/uc?export=view&id=1iftEnhJKsASmLxxiGsNm5mtq-sF7AFxP";

  // const billboardSeeds = [
  //   {
  //     label: "Jeans",
  //     labelRu: "Джинсы",
  //     labelKg: "Джинсы", // при желании можете заменить на правильный перевод на кыргызский
  //   },
  //   {
  //     label: "Hoodie",
  //     labelRu: "Худи",
  //     labelKg: "Худи",
  //   },
  //   {
  //     label: "Pants",
  //     labelRu: "Брюки",
  //     labelKg: "Шым",
  //   },
  //   {
  //     label: "Jacket",
  //     labelRu: "Куртка",
  //     labelKg: "Куртка",
  //   },
  //   {
  //     label: "Sweatshirt",
  //     labelRu: "Свитшот",
  //     labelKg: "Свитшот",
  //   },
  // ];

  // const billboard = await Promise.all(
  //   billboardSeeds.map((bb) =>
  //     database.billboard.create({
  //       data: {
  //         storeId: "2598e43c-a3ea-408a-bd12-1aed95bc673a",
  //         imageUrl: billboardImageUrl,
  //         ...bb,
  //       },
  //     }),
  //   ),
  // );

  // // Create category
  // const storeId = "2598e43c-a3ea-408a-bd12-1aed95bc673a";

  // const billboardByLabel: Record<string, string> = {
  //   Jeans: "75c443b8-b792-4495-84f8-abf67e1ff797",
  //   Hoodie: "554626e7-a5ea-4384-bace-324d159ab002",
  //   Pants: "4f0853dd-1d67-44f5-bcef-5292e0910bd0",
  //   Jacket: "50d6b7b3-d31f-4fac-9ff0-e43367321ca7",
  //   Sweatshirt: "c187d9bb-a372-483b-8fab-7d08d4bf5b83",
  // };

  // const categorySeeds = [
  //   {
  //     name: "Jeans",
  //     nameRu: "Джинсы",
  //     nameKg: "Джинсы",
  //   },
  //   {
  //     name: "Hoodie",
  //     nameRu: "Худи",
  //     nameKg: "Худи",
  //   },
  //   {
  //     name: "Pants",
  //     nameRu: "Брюки",
  //     nameKg: "Шым",
  //   },
  //   {
  //     name: "Jacket",
  //     nameRu: "Куртка",
  //     nameKg: "Куртка",
  //   },
  //   {
  //     name: "Sweatshirt",
  //     nameRu: "Свитшот",
  //     nameKg: "Свитшот",
  //   },
  // ];

  // const categories = await Promise.all(
  //   categorySeeds.map((cat) =>
  //     database.category.create({
  //       data: {
  //         storeId,
  //         billboardId: billboardByLabel[cat.name],
  //         ...cat,
  //       },
  //     }),
  //   ),
  // );

  // Seed sizes
  // const sizes = await Promise.all(
  //   [
  //     { name: "Extra Small", nameRu: "Очень маленький", nameKg: "Өтө кичине", value: "XS" },
  //     { name: "Small", nameRu: "Маленький", nameKg: "Кичинекей", value: "S" },
  //     { name: "Medium", nameRu: "Средний", nameKg: "Орто", value: "M" },
  //     { name: "Large", nameRu: "Большой", nameKg: "Чоң", value: "L" },
  //     { name: "Extra Large", nameRu: "Очень большой", nameKg: "Өтө чоң", value: "XL" },
  //   ].map((size) =>
  //     database.size.create({
  //       data: { storeId: "2598e43c-a3ea-408a-bd12-1aed95bc673a", ...size },
  //     }),
  //   ),
  // );

  // const colorSeeds = [
  //   // Базовые из вашего примера
  //   { name: "Red",   nameRu: "Красный",  nameKg: "Кызыл",  value: "#FF0000" },
  //   { name: "Black", nameRu: "Черный",   nameKg: "Кара",   value: "#000000" },
  //   { name: "White", nameRu: "Белый",    nameKg: "Ак",     value: "#FFFFFF" },

  //   // Из вашего списка
  //   { name: "Gray",        nameRu: "Серый",             nameKg: "Боз",        value: "#808080" },  // серый
  //   { name: "Light Blue",  nameRu: "Голубой",           nameKg: "Көгүлтүр",   value: "#87CEEB" }, // голубой
  //   { name: "Green",       nameRu: "Зелёный",           nameKg: "Жашыл",      value: "#008000" }, // зелёный

  //   { name: "Vintage Black", nameRu: "Винтажный чёрный", nameKg: "Винтаж кара", value: "#1C1C1C" }, // винтажный чёрный
  //   { name: "Gray-White",    nameRu: "Серо-белый",       nameKg: "Боз-ак",      value: "#F5F5F5" }, // серо-белый
  //   { name: "Khaki Green",   nameRu: "Хаки-зелёный",     nameKg: "Хаки жашыл",  value: "#78866B" }, // хаки-зелёный

  //   { name: "Beige",        nameRu: "Бежевый",        nameKg: "Беж",        value: "#F5F5DC" }, // бежевый
  //   { name: "Light Gray",   nameRu: "Светло-серый",   nameKg: "Ачык боз",   value: "#D3D3D3" }, // светло-серый
  //   { name: "Dark Gray",    nameRu: "Тёмно-серый",    nameKg: "Кочкул боз", value: "#A9A9A9" }, // темно-серый
  // ];

  // Seed colors
  // const colors = await Promise.all(
  //   colorSeeds.map((color) =>
  //     database.color.create({
  //       data: {
  //         storeId: "2598e43c-a3ea-408a-bd12-1aed95bc673a",
  //         ...color,
  //       },
  //     }),
  //   ),
  // );

  // Seed product
  // await database.product.create({
  //   data: {
  //     storeId: store.id,
  //     categoryId: category.id,
  //     name: "Red Jacket",
  //     nameRu: "Красная куртка",
  //     nameKg: "Кызыл куртка",
  //     description: "A warm red jacket for winter. Water resistant shell, insulated lining, and soft inner fleece.",
  //     descriptionRu: "Теплая красная куртка для зимы. Водоотталкивающая оболочка, утепленная подкладка и мягкий флис внутри.",
  //     descriptionKg: "Кышка ылайыктуу кызыл куртка. Суу өткөрбөйт, жылуу ички катмар жана жумшак флис.",
  //     brand: "Acme",
  //     price: 79.99,
  //     weight: 0.75,
  //     sizes: {
  //       connect: sizes.map((size) => ({ id: size.id })),
  //     },
  //     colors: {
  //       connect: colors.map((color) => ({ id: color.id })),
  //     },
  //     images: {
  //       create: [
  //         { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80" },
  //         { url: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80" },
  //       ],
  //     },
  //   },
  // });

//   console.log("Seed complete");
// }

// main()
//   .catch((e) => {
//     console.error("Seed failed", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await database.$disconnect();
//   });

// product.seeds.ts

const storeId = "2598e43c-a3ea-408a-bd12-1aed95bc673a";

// Category IDs (из вашего JSON)
const categoryIdByRu: Record<string, string> = {
  "Брюки": "d8b4cd02-e115-4729-891e-74fcbb6f1fa2",      // Pants
  "Джинсы": "91194be4-27b8-4fac-a0e2-6c22ccb5aa86",     // Jeans
  "Свитшот": "c2b29385-5a20-4cef-9775-712e397484fb",    // Sweatshirt
  "Куртка": "ae31caf9-ecbc-4303-b33d-1f5e8bb8225f",     // Jacket
  "Худи": "7acad4c8-a9f6-4f37-9f55-ed9ce43f359f",       // Hoodie
};

// Size IDs (из вашего JSON)
const sizeIds = {
  XS: "bf55251a-0dbb-4359-9d83-3d47bffec2e8",
  S:  "9c16e16c-548c-41b1-a5bc-292e7ad3f78c",
  M:  "c263b82d-d846-4860-87c3-9fc2131021f1",
  L:  "f4fe1cea-e1df-409f-a6f9-01fba254d619",
  XL: "54ea36be-fd52-4d9b-94e0-994d8533e8f8",
};

// Диапазоны размеров:
const sizeRangeToIds: Record<string, string[]> = {
  "XS-XL": [sizeIds.XS, sizeIds.S, sizeIds.M, sizeIds.L, sizeIds.XL],
  "S-XL":  [sizeIds.S, sizeIds.M, sizeIds.L, sizeIds.XL],
};

// Color IDs (из вашего JSON, ключи — как в таблице)
const colorIdByRu: Record<string, string> = {
  "чёрный": "fc37c532-1833-4edf-8f4c-eb7e0b0de2dd",
  "черный": "fc37c532-1833-4edf-8f4c-eb7e0b0de2dd",
  "серый": "4d197c45-2035-4d97-a69a-74fe4ae90211",
  "голубой": "325b2236-6029-4ca5-8e05-bc2bf4a8f68f",
  "зелёный": "25d8438a-cd21-4220-9478-2f3e74a925c2",
  "белый": "733d4cf6-b6b7-484d-8a1f-8c83b5993cff",
  "винтажный чёрный": "fcefe860-0794-471e-893a-5ff5b30ee8e8",
  "серо-белый": "9ed45d1f-9279-46ed-9cec-f2ac96ba92b8",
  "хаки-зелёный": "9294b08a-cef6-4779-9309-e526c381c9d2",
  "бежевый": "f9405b7d-dc92-4ffb-b52a-045924fd8413",
  "светло-серый": "b8e8c640-257b-4000-b69e-f5cad355d20c",
  "темно-серый": "8a624e89-8541-4ef0-a3f3-d1c9a234efd2",
};

// All image links by product (original Google Drive "view" URLs)
export const productImages: Record<string, string[]> = {
  "REVENGEX BAGGY FLARE JEANS_черный": [
    "https://drive.google.com/file/d/1wrcz31RQqC4UkaIqZ-EN7CDbTGdNTtmt/view?usp=drive_link",
    "https://drive.google.com/file/d/1npgC3fmJ_rSk8iJDSV_e1xDUgu5KWG2P/view?usp=drive_link",
    "https://drive.google.com/file/d/1K8COt5nqJV-jmWTjjPGdbNmk9CweWCEk/view?usp=drive_link",
    "https://drive.google.com/file/d/1v4xOkGenCmDVnRz-HzNRamcW6etFqsDN/view?usp=drive_link",
    "https://drive.google.com/file/d/1Qw19uPfTXoTnub9Zm29fS3-Qsg5Q6Kxc/view?usp=drive_link",
    "https://drive.google.com/file/d/1DPhL1n7VSqI-kCHzmR1Uf5AEyUw-Q7-0/view?usp=drive_link",
    "https://drive.google.com/file/d/1z3ZvQRnAnbdwszRHO_Mm1Fa9Z_n-hC2m/view?usp=drive_link",
    "https://drive.google.com/file/d/1BzE9_oIRymOT3exdCKyYT2mssYPQP-fP/view?usp=drive_link",
  ],

  "REVENGEX BAGGY FLARE JEANS_серый": [
    "https://drive.google.com/file/d/1fOhfoBvsLElcxKFE498X3axu2FfvOKUh/view?usp=drive_link",
    "https://drive.google.com/file/d/1Kx7vNqE88xQL6WdghNYj4UDJBSdbvaqQ/view?usp=drive_link",
    "https://drive.google.com/file/d/1iJoAcUDSFh0dPoWbLo3r_o1ibzTjJ0Xz/view?usp=drive_link",
    "https://drive.google.com/file/d/1KI1odrMYBncWnJp9Q9FuuGSex_AaoNoP/view?usp=drive_link",
    "https://drive.google.com/file/d/1EQpUzUvdzQUEzFe3CuWRKR0XLFNl5QxX/view?usp=drive_link",
    "https://drive.google.com/file/d/1ZUnEvXD0YPpofveF2CfOEWgz-ZO_ySCB/view?usp=drive_link",
    "https://drive.google.com/file/d/1Jq64LIcIootgtVQo8BUHyYHuwCpVk5uJ/view?usp=drive_link",
  ],

  "REVENGEX BAGGY FLARE JEANS_голубой": [
    "https://drive.google.com/file/d/1CV3EEJg-Tko45erRBa2cIQV8L1-TJGE5/view?usp=drive_link",
    "https://drive.google.com/file/d/1hXCHZ3CuwMNLdVWoiX1JrYdgFkz6h2ub/view?usp=drive_link",
    "https://drive.google.com/file/d/1zZf7I8htHngYNtWfE468G6av0jLRfZl9/view?usp=drive_link",
    "https://drive.google.com/file/d/1KvLi_NDxR4DL0_iCajAZo17H1HXw-xBD/view?usp=drive_link",
    "https://drive.google.com/file/d/1tTXnpgBpM2tg32haFijBNb2CNCHnuaeo/view?usp=drive_link",
    "https://drive.google.com/file/d/1E_qKAeyWtpNh8vP6VyReH9iXy7mz756N/view?usp=drive_link",
    "https://drive.google.com/file/d/1uRjF4SHIzhezxuBMDqhOjxM68_a7OpSj/view?usp=drive_link",
  ],

  "REVENGEX FLARE FIT ZIPPED JEAN_голубой": [
    "https://drive.google.com/file/d/1v1PI3E6K96qdMaOGyb5YlN7OVz6KuvY8/view?usp=drive_link",
    "https://drive.google.com/file/d/13N-uKgCEM04XeBEhSvUT3Z0Cw7LBIE7g/view?usp=drive_link",
    "https://drive.google.com/file/d/18LfEz7AzAJgrgcSFzcVpusgtq_2As463/view?usp=drive_link",
    "https://drive.google.com/file/d/1N2V8xXyGc_083dWI7S2ccBPcIT9kud9m/view?usp=drive_link",
    "https://drive.google.com/file/d/1j0vtxyBpCstHUnoQ6MAEyeBBelPqjfBY/view?usp=drive_link",
    "https://drive.google.com/file/d/1RLuenlduolH0Luq11CdX3YkhpnCUkbbR/view?usp=drive_link",
    "https://drive.google.com/file/d/1hBA_5rwZIfUIRNyZ5y2hUWuejLoKbqE6/view?usp=drive_link",
    "https://drive.google.com/file/d/1LVhfWVGPEQ7mJQvY_5YovEZUMNctGmbv/view?usp=drive_link",
  ],

  "REVENGEX FLARE FIT ZIPPED JEAN_серый": [
    "https://drive.google.com/file/d/1yGac0Zsbsl4H9I4slW6iHaKLldxR-wv_/view?usp=drive_link",
    "https://drive.google.com/file/d/10MXmmMTi1TPlmwcBmfh6Jokhwz9r2LMB/view?usp=drive_link",
    "https://drive.google.com/file/d/17aHAxbGlZYNqdHU2t4ZNUds5eL_Cv_Hp/view?usp=drive_link",
    "https://drive.google.com/file/d/1cpBnoc3Jzqj5dsDYNKIuQMexv2fSPk6R/view?usp=drive_link",
    "https://drive.google.com/file/d/1nuIds7v1QkTnmAXhulnH5Vz1lS5D5t6P/view?usp=drive_link",
    "https://drive.google.com/file/d/11qd_ApeWG7PdmNEM7zoVupoXPTnHQnKa/view?usp=drive_link",
    "https://drive.google.com/file/d/1eQ1HAXHaaSvY3zOeagq89WZDQq-9Ujod/view?usp=drive_link",
    "https://drive.google.com/file/d/1eCt7F7nLHLfwYy8cdSotuNeQ2PXIHUri/view?usp=drive_link",
  ],

  "REVENGEX FLARE FIT ZIPPED JEAN_черный": [
    "https://drive.google.com/file/d/10Ot_xa6k2whHso303Soo5WyK9ja0U16s/view?usp=drive_link",
    "https://drive.google.com/file/d/1lWGYVpHVwYsRz7bVwaHAv0084zLMcGZV/view?usp=drive_link",
    "https://drive.google.com/file/d/1TZF7RUOqGNW6LtZ2cXRKdf5PhPt-2Ptc/view?usp=drive_link",
    "https://drive.google.com/file/d/1gRxre503Sqr7YZzAXAUBCVZ6MeRYPaRu/view?usp=drive_link",
    "https://drive.google.com/file/d/1328epESwmetHbxlAE95UQ4PxfKLPmMEk/view?usp=drive_link",
    "https://drive.google.com/file/d/16XjJ034IhHeBqAnaZJiMqG7vQ_hTOzrO/view?usp=drive_link",
    "https://drive.google.com/file/d/1eKsjf2m24F--tnqNVbbUM10hbfrWrGX7/view?usp=drive_link",
    "https://drive.google.com/file/d/1im8pYbSC71CPX5EG2eLrcY9Xu8XoHfYQ/view?usp=drive_link",
  ],

  "FOG Essentials × Union LA Hoodie_зеленый": [
    "https://drive.google.com/file/d/1T-6jP8Z2-HtWubLTIaeTiYHdp33BqjK3/view?usp=drive_link",
    "https://drive.google.com/file/d/1iFkaC01ZrJdSsXrPlfy0zXy0aYOslo4D/view?usp=drive_link",
    "https://drive.google.com/file/d/1sThKh2LPurT7ZTqRloUa8c5xcaaIgIsR/view?usp=drive_link",
    "https://drive.google.com/file/d/17Jajws0vke19cr9RtWG1wateb4Y80lof/view?usp=drive_link",
    "https://drive.google.com/file/d/1EHM7eDke_Uy-hvvbxjAvE-dzm1hDMbBP/view?usp=drive_link",
    "https://drive.google.com/file/d/1hCD7gImppSfh2EQtpM3E5RCkwne1EKX-/view?usp=drive_link",
    "https://drive.google.com/file/d/11NLDrdg11dRGvXlH6iYS1FG_i-WjrRKl/view?usp=drive_link",
  ],

  "FOG Essentials × Union LA Hoodie_белый": [
    "https://drive.google.com/file/d/1qzQpP1b36IVGxkCiQIrYXzZaww5E_Xp-/view?usp=drive_link",
    "https://drive.google.com/file/d/1oIJedzQwtQ2JdV3LQtbiG1RH3XdRsnWK/view?usp=drive_link",
    "https://drive.google.com/file/d/1GZM3Lxxr7vEDMWI_BZaES8K73Nq_jk39/view?usp=drive_link",
    "https://drive.google.com/file/d/1x3Vm3qZD087E_fvG41ZRt3hNGa558Hxi/view?usp=drive_link",
    "https://drive.google.com/file/d/178LfQtouQv8Ih2J18kRNMSUrp8oBUHGv/view?usp=drive_link",
    "https://drive.google.com/file/d/1lumnzPIjPu9W6VcxjRoXLJOn9Q9fvBCL/view?usp=drive_link",
    "https://drive.google.com/file/d/1EzyuwdrEnI0YMm4-h15jJQyMmAoHgK8T/view?usp=drive_link",
    "https://drive.google.com/file/d/1PW_opkiXpad-i1zM3BnnzzzKdIj2PQkl/view?usp=drive_link",
    "https://drive.google.com/file/d/1vuRCvzj-F25cKi9AdqCjDh669vFCKpyi/view?usp=drive_link",
  ],

  "FOG Essentials × Union LA Hoodie_черный": [
    "https://drive.google.com/file/d/1N47as3t7Qib59IOuKCGwKoNX_Mmj0rJh/view?usp=drive_link",
    "https://drive.google.com/file/d/1UIq7kSLyhJyEDuB5yS6MvVE_PK4mV0eh/view?usp=drive_link",
    "https://drive.google.com/file/d/16VgbagA5oPIMA4bpW7mEpJmVznYPNAT9/view?usp=drive_link",
    "https://drive.google.com/file/d/18uVkmdLT5L1jSMpqhLd3kpZPg0aBZ9Mo/view?usp=drive_link",
    "https://drive.google.com/file/d/1nBqtGoc1f5Yq6cNmvWp4uIETaeBtsp1q/view?usp=drive_link",
    "https://drive.google.com/file/d/1kzhyeffZmvyEkRroS46cmSnR9w_Zgj5x/view?usp=drive_link",
    "https://drive.google.com/file/d/1uW7-8H-E-KYRu5SArRjG9_UJciGwC3nZ/view?usp=drive_link",
  ],

  "FOG Essentials × Union LA Sweatpants_зеленый": [
    "https://drive.google.com/file/d/1vbPMMDMw4FE9fGkMfRcuvPM6nn0Z-dXA/view?usp=drive_link",
    "https://drive.google.com/file/d/1jbaDKii_C4Xj4Huxdn2KzfuF-HP43wCi/view?usp=drive_link",
    "https://drive.google.com/file/d/1PwkvzfpH-b2Cv7sGA_NoBpc71CxAEE9-/view?usp=drive_link",
    "https://drive.google.com/file/d/1JHsdllboOKNOf2rNqXDly_84HVGVPPtk/view?usp=drive_link",
    "https://drive.google.com/file/d/1ZI2GGfbCdTfsrVWPiYIVxUAgL5p0xny7/view?usp=drive_link",
    "https://drive.google.com/file/d/1aD98rc1loSHTX-zFfzMZPEjvvutvjpsx/view?usp=drive_link",
    "https://drive.google.com/file/d/1I1sWUzKJvEJdYmy2VID4D5g82h6naEfc/view?usp=drive_link",
  ],

  "FOG Essentials × Union LA Sweatpants_белый": [
    "https://drive.google.com/file/d/1LGbxzppJxyMTnkX5HNOtvAapI5wZmUj1/view?usp=drive_link",
    "https://drive.google.com/file/d/1v6dWpxc6l_08M9P36ALs5Oz2udTMAFSY/view?usp=drive_link",
    "https://drive.google.com/file/d/1nEE9yTp4OjjVRuwTC9cDFC9IUhNT9taL/view?usp=drive_link",
    "https://drive.google.com/file/d/1urfwVmSGt3LWzFAlAOfP9pNPPXh3L0fz/view?usp=drive_link",
    "https://drive.google.com/file/d/1-ECGAl2M_hnhTsOC15G8VTWI-ImZ0eaM/view?usp=drive_link",
    "https://drive.google.com/file/d/1pev9EhrSGqZ7EDg1QRTGMG-fGHn297-O/view?usp=drive_link",
    "https://drive.google.com/file/d/1jPVUsLea1a2jj49MbZ6pgwZyWBOPY1Rk/view?usp=drive_link",
    "https://drive.google.com/file/d/1q1yF9Wkio1XIZcD5lX8-02v-kZ6J-U8E/view?usp=drive_link",
  ],

  "FOG Essentials × Union LA Sweatpants_черный": [
    "https://drive.google.com/file/d/137bx65wGCkE_mvrkMOHKBYXJIbEFmrVv/view?usp=drive_link",
    "https://drive.google.com/file/d/1iA-MmCcGJkE5-OptDMYfrqnA9LO6KFsD/view?usp=drive_link",
    "https://drive.google.com/file/d/1cEHeSSyFwqXZ9LxlB_7cRPdoYgnjMJ9t/view?usp=drive_link",
    "https://drive.google.com/file/d/1CO29zwpNRvKRRLHaE6O2vE3N4vpZ1acI/view?usp=drive_link",
    "https://drive.google.com/file/d/1yylj6LaR5E1OfnHFTiDAoNK6Kx6fmrWC/view?usp=drive_link",
    "https://drive.google.com/file/d/1gwUxDFMWbG2YR5L0C62nwnKsNAAqGR_p/view?usp=drive_link",
    "https://drive.google.com/file/d/1ziCW5efun6YL6UKBHt9vPm63EtXNYDl2/view?usp=drive_link",
  ],

  "FOG Essentials Holiday Classic Hoodie_винтажный-черный": [
    "https://drive.google.com/file/d/1Gy4rgqy3Ss6Zt6XcLYVLQqpzHQjzjQX-/view?usp=drive_link",
    "https://drive.google.com/file/d/14bITzSitwyH5Zb5SAn2NvCKNdY4c5rmA/view?usp=drive_link",
    "https://drive.google.com/file/d/1VxWxpHrkuzuja8RhBaqkiDe-97oMvfri/view?usp=drive_link",
    "https://drive.google.com/file/d/1AIphuSqzSqHDirsaLn4K1yJqfetAB2oU/view?usp=drive_link",
    "https://drive.google.com/file/d/13YTg5km4IFfuZksQTPoJnJPNV5igCqsM/view?usp=drive_link",
    "https://drive.google.com/file/d/1eZRkKf1ivElkSp-7pM-RZ8rZo9ZE3YhI/view?usp=drive_link",
    "https://drive.google.com/file/d/1REKoFTICEdyNlfLguGdzKSMvE2ZDVdhz/view?usp=drive_link",
    "https://drive.google.com/file/d/1h919eoY9FHGZ--lRnk5inreCzf6YfMwW/view?usp=drive_link",
  ],

  "Canada Goose Alberni Reversible Jacket_черный": [
    "https://drive.google.com/file/d/1Sj93F2BardOS8M6ryxVUCsc54j-ezgo5/view?usp=drive_link",
    "https://drive.google.com/file/d/10LwUamefui8stL9Nr13YftK4BvBz2ntK/view?usp=drive_link",
    "https://drive.google.com/file/d/1QT0gSv6Kotm0i0hq7hR-dIuWHvnIqkcE/view?usp=drive_link",
    "https://drive.google.com/file/d/1_BcCg4Urenhm0pPLEO6t7yKkxZUYmVqz/view?usp=drive_link",
    "https://drive.google.com/file/d/1OThcVBFvpOIUUj3iGN90HiSiddR55Emt/view?usp=drive_link",
    "https://drive.google.com/file/d/1vK9BSybNShKZZYyZaMZYQBgM2t7LhkL1/view?usp=drive_link",
    "https://drive.google.com/file/d/1tbLOiw8v2UU6UxiGXcO_F86isDrOxoIo/view?usp=drive_link",
    "https://drive.google.com/file/d/1wG73itzuiPOjEUzq4K4aBrUJ6POq4mp7/view?usp=drive_link",
  ],

  "Canada Goose Alberni Reversible Jacket_серо-белый": [
    "https://drive.google.com/file/d/1Sj93F2BardOS8M6ryxVUCsc54j-ezgo5/view?usp=drive_link",
    "https://drive.google.com/file/d/10LwUamefui8stL9Nr13YftK4BvBz2ntK/view?usp=drive_link",
    "https://drive.google.com/file/d/1QT0gSv6Kotm0i0hq7hR-dIuWHvnIqkcE/view?usp=drive_link",
    "https://drive.google.com/file/d/1_BcCg4Urenhm0pPLEO6t7yKkxZUYmVqz/view?usp=drive_link",
    "https://drive.google.com/file/d/1OThcVBFvpOIUUj3iGN90HiSiddR55Emt/view?usp=drive_link",
    "https://drive.google.com/file/d/1vK9BSybNShKZZYyZaMZYQBgM2t7LhkL1/view?usp=drive_link",
    "https://drive.google.com/file/d/1tbLOiw8v2UU6UxiGXcO_F86isDrOxoIo/view?usp=drive_link",
    "https://drive.google.com/file/d/1wG73itzuiPOjEUzq4K4aBrUJ6POq4mp7/view?usp=drive_link",
  ],

  "Canada Goose Alberni Reversible Jacket_хаки-зеленый": [
    "https://drive.google.com/file/d/1Sj93F2BardOS8M6ryxVUCsc54j-ezgo5/view?usp=drive_link",
    "https://drive.google.com/file/d/10LwUamefui8stL9Nr13YftK4BvBz2ntK/view?usp=drive_link",
    "https://drive.google.com/file/d/1QT0gSv6Kotm0i0hq7hR-dIuWHvnIqkcE/view?usp=drive_link",
    "https://drive.google.com/file/d/1_BcCg4Urenhm0pPLEO6t7yKkxZUYmVqz/view?usp=drive_link",
    "https://drive.google.com/file/d/1OThcVBFvpOIUUj3iGN90HiSiddR55Emt/view?usp=drive_link",
    "https://drive.google.com/file/d/1vK9BSybNShKZZYyZaMZYQBgM2t7LhkL1/view?usp=drive_link",
    "https://drive.google.com/file/d/1tbLOiw8v2UU6UxiGXcO_F86isDrOxoIo/view?usp=drive_link",
    "https://drive.google.com/file/d/1wG73itzuiPOjEUzq4K4aBrUJ6POq4mp7/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Crewneck_бежевый": [
    "https://drive.google.com/file/d/1BKn40N5JbFsUSo6I2t_teFVQ8NGvI1ZK/view?usp=drive_link",
    "https://drive.google.com/file/d/18yK8afsvQcWGHlfh_RoP2Iigu2r1mjgf/view?usp=drive_link",
    "https://drive.google.com/file/d/10YyzLAa9jAi7WBPT1DqYlSKFI7FUpkll/view?usp=drive_link",
    "https://drive.google.com/file/d/1kWBOkPUXnbGPcLrUJlTBiJLqy3IEAob5/view?usp=drive_link",
    "https://drive.google.com/file/d/1jS6ezN_mrhKpXuYNZYa-ri0EFrF62bzZ/view?usp=drive_link",
    "https://drive.google.com/file/d/1OM3yqhf8kL8mBWp3lPPVag8v5rdGbJzw/view?usp=drive_link",
    "https://drive.google.com/file/d/1GZchot79E4Fg4abFt-zyzTEXmaL8KVtd/view?usp=drive_link",
    "https://drive.google.com/file/d/18Cd8AzmmrJ7dglCY1ZIdQ6fgtn3pBnQB/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Crewneck_черный": [
    "https://drive.google.com/file/d/1j-e042OOFbr9OCet_VvCAv2OGKhfN_yN/view?usp=drive_link",
    "https://drive.google.com/file/d/1BnGBV7LdqBmadc5BzfBXvDL41p5Y9ZQb/view?usp=drive_link",
    "https://drive.google.com/file/d/1GtCwDA-sdjmNMurCBArO_SaJYtmw_xjq/view?usp=drive_link",
    "https://drive.google.com/file/d/1JV2fUtlZkUiZv5oH26cdZjacrh4WRXTX/view?usp=drive_link",
    "https://drive.google.com/file/d/1kfPTlIFPDTJdZKNuad_3Ubqf84h8j1g2/view?usp=drive_link",
    "https://drive.google.com/file/d/1pYhekROR302DOzz9SYqbDHj81l-JgCi-/view?usp=drive_link",
    "https://drive.google.com/file/d/1eyTAYG0bBFxStI0G_xlmymQjx7hWJ_2V/view?usp=drive_link",
    "https://drive.google.com/file/d/1uTNEFwXk9DLas0Zii8pFtDScv_sfvjRh/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Crewneck_светло-серый": [
    "https://drive.google.com/file/d/1Ga8Bp9eJp6wWOx7rpDXW-2dnUP1YUs1S/view?usp=drive_link",
    "https://drive.google.com/file/d/1v83TwxJgXheMmpahH6ZqZddUVEN6FHpE/view?usp=drive_link",
    "https://drive.google.com/file/d/194cp8UiyIMLziwk2Ebb9izccqUrvxwnN/view?usp=drive_link",
    "https://drive.google.com/file/d/1EcDgQ-M6lyCyyo2qNGHsgiHGiguHS27W/view?usp=drive_link",
    "https://drive.google.com/file/d/19gpC6in92IfoqyoYoTdN8oSuPmFBmyte/view?usp=drive_link",
    "https://drive.google.com/file/d/1j2KEC2KH2gC-seuPeCnTx93TCnfVoqAO/view?usp=drive_link",
    "https://drive.google.com/file/d/1W8hFzL1eZ80j4tdyQ3BdHPJrpSq3KMI4/view?usp=drive_link",
    "https://drive.google.com/file/d/115pjGeps2RtvRHhawttPI0yI0556F7Fv/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Crewneck_темно-серый": [
    "https://drive.google.com/file/d/1NWTd4qL7Bq16WbAkoVeHD1zfVNjSdSgI/view?usp=drive_link",
    "https://drive.google.com/file/d/12gQUPRo2Fmec6H7MmU2gxwFnAcKDuMbW/view?usp=drive_link",
    "https://drive.google.com/file/d/1NxB5ACZsIqRFaB2V0-aDqZnrivA6jSop/view?usp=drive_link",
    "https://drive.google.com/file/d/1DVdghFGM1tt2PSQlpOvtPnNvhk3VzMHm/view?usp=drive_link",
    "https://drive.google.com/file/d/1LE-eZ0YwXda7yF_LyfUKVRjRqXSHjOMT/view?usp=drive_link",
    "https://drive.google.com/file/d/106tgz1BCTw8eNcTzcFuJMwqS9WEmRPof/view?usp=drive_link",
    "https://drive.google.com/file/d/1Pe0avhI64DPkdA61Qq6xZMc3M4pWwbh7/view?usp=drive_link",
    "https://drive.google.com/file/d/1dqg7oeGkWc_jmVEB6Q1ZGgisDBXBIY2H/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Sweatpants_бежевый": [
    "https://drive.google.com/file/d/1jXnE7a-cRy77EtXhIJ-ndHWr2cQPYPtE/view?usp=drive_link",
    "https://drive.google.com/file/d/1-RSvN1r0iWOfCfTZW25WwYnUR4pmMZXu/view?usp=drive_link",
    "https://drive.google.com/file/d/155h1_YrLEOiri-kwMf1d8Cv2RctJ50bm/view?usp=drive_link",
    "https://drive.google.com/file/d/1YlKMVrsNaJHtEqnpUrdJ9VFMuBpkGFBk/view?usp=drive_link",
    "https://drive.google.com/file/d/1vtr-82u2aTyNJlnHLAlAIlVKt6PHl8cQ/view?usp=drive_link",
    "https://drive.google.com/file/d/1-AH0uC4WyMc5lKNQP8D0vzZfDtTpQYIe/view?usp=drive_link",
    "https://drive.google.com/file/d/1li0oHRqbvUEMkGHXpG7piDpTpIIBZ4CN/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Sweatpants_черный": [
    "https://drive.google.com/file/d/1iAESG6FmqVKTM_h47k0Bn_fHXLPPUSUi/view?usp=drive_link",
    "https://drive.google.com/file/d/1Yz90iHhQ3N5NNDp0WweCnKbWwqJRk9rV/view?usp=drive_link",
    "https://drive.google.com/file/d/1nXKJaoTTXdVEz23BeCJqPHxS95SmQoeP/view?usp=drive_link",
    "https://drive.google.com/file/d/1PWyM5D5dKfWQCauVunLlZlSXuGEeOicH/view?usp=drive_link",
    "https://drive.google.com/file/d/1yHrKEJPs5a-uQNBwycUJWGhzxHvXQXKJ/view?usp=drive_link",
    "https://drive.google.com/file/d/1Tl_xtRsrf8vP36MXEurZ-0_ZxXAOQnCC/view?usp=drive_link",
    "https://drive.google.com/file/d/1ahCefbhY1ibI38X3k2XGgqUYAsqWKI8P/view?usp=drive_link",
    "https://drive.google.com/file/d/168A0CKF5ZkN0L2U-NAdglpWpHHC14YkQ/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Sweatpants_светло-серый": [
    "https://drive.google.com/file/d/1r_K-ywsoTy9yqwj_NvfjmcVXhJs_aoRM/view?usp=drive_link",
    "https://drive.google.com/file/d/1Bz-jLxLgo6uO6CSaFZ46-omOL4V4X9cy/view?usp=drive_link",
    "https://drive.google.com/file/d/1F_xEvgzPj8V5r6vzqt2I2sRpwpKZtgLG/view?usp=drive_link",
    "https://drive.google.com/file/d/1IlCNdDAaom8HJJmk2D0_GFvbiqN_cwXx/view?usp=drive_link",
    "https://drive.google.com/file/d/16DfwopbZSYyqcWFocuqQIxFJTQ29EJLd/view?usp=drive_link",
    "https://drive.google.com/file/d/1Y0dryVGDTGEIVFPb0i7QsIo5CKQSFYgF/view?usp=drive_link",
    "https://drive.google.com/file/d/1AWiTxIseRZZu1LOZ_Uj2hXZrOCzIYXw6/view?usp=drive_link",
    "https://drive.google.com/file/d/1vA5LVxi_Cz0bbCU3UZenrjtrPCNgaK_p/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Sweatpants_темно-серый": [
    "https://drive.google.com/file/d/1za-NnxYvyJN9OuH_wobbKdCaapWOBMw7/view?usp=drive_link",
    "https://drive.google.com/file/d/1fNuArokbwlSA1uLbwhcZjzkQGZYWuFrE/view?usp=drive_link",
    "https://drive.google.com/file/d/1Q_spu9tCSz1jQhAem-DjRy9yC5MmfVgY/view?usp=drive_link",
    "https://drive.google.com/file/d/1fMElcMgA1yGa15OAj-Ufy0nCq-J3MUHg/view?usp=drive_link",
    "https://drive.google.com/file/d/1WhVAUeVMGRXgYdo0hSaL896P3QRLngsc/view?usp=drive_link",
    "https://drive.google.com/file/d/1E04hOgGW_y0KHbs1l36VhZ5vx-a5V-5C/view?usp=drive_link",
    "https://drive.google.com/file/d/1U4B94faQDusAuXu34XezHyafTVlj5YXP/view?usp=drive_link",
    "https://drive.google.com/file/d/1_f_gRDKQM8_cmttF0Sz9ea5B6r77wRAk/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Hoodie_бежевый": [
    "https://drive.google.com/file/d/1CgrrInaHpDmUc3YBSQegivJeFLRaou4H/view?usp=drive_link",
    "https://drive.google.com/file/d/15axVVYUqrraN31flJF_lW9TKRwfvsfWN/view?usp=drive_link",
    "https://drive.google.com/file/d/1r3wohvEVIRPv7NBekOCFTFdfBKo5Pwcz/view?usp=drive_link",
    "https://drive.google.com/file/d/1f4eLchXeCLaPQ6Y497kEYWH37RQUWoFL/view?usp=drive_link",
    "https://drive.google.com/file/d/1BPhMVKLou0B5J_ZhehtNXSFUpN98YaL6/view?usp=drive_link",
    "https://drive.google.com/file/d/1LFCulryMb2egXEpLqCyxaQ02txYON5tz/view?usp=drive_link",
    "https://drive.google.com/file/d/1Wy4TGnE2QiBdS02mMfiPyR6jQnoS81Jj/view?usp=drive_link",
    "https://drive.google.com/file/d/12ss_VD-XTMgMROt_JZj0f4akfSfHOl7l/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Hoodie_черный": [
    "https://drive.google.com/file/d/1jHlkIsTh4BxjqdtSpl_1TzP_HaKlNx5t/view?usp=drive_link",
    "https://drive.google.com/file/d/1IYffU0WN6A7ZWXROnidkrw8s3_MA_ac7/view?usp=drive_link",
    "https://drive.google.com/file/d/17kSTrPKUBmO-mbIDrtxD_bx-jTZn5Yxz/view?usp=drive_link",
    "https://drive.google.com/file/d/17mY30KD0t8DeiBTIcHczhRsYCAuTTFjT/view?usp=drive_link",
    "https://drive.google.com/file/d/1BQw6BBEtL2aL_MH9hfjTu7Z5DZLbtj36/view?usp=drive_link",
    "https://drive.google.com/file/d/1RCrMLNIUQTObarNNpFyJVIU8kdXTOjIW/view?usp=drive_link",
    "https://drive.google.com/file/d/1bbkXYBC05Rck_t8rjiZKeZ7pnb3KZfWe/view?usp=drive_link",
    "https://drive.google.com/file/d/1tx9utKI4wdGNVc1B7zKPb8epWTJtaEJf/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Hoodie_светло-серый": [
    "https://drive.google.com/file/d/1fj2BuP3HXGPsyw8tRd8nb0mVi26SnxCG/view?usp=drive_link",
    "https://drive.google.com/file/d/1KkwWJa58_IR86en05Fred7q3ntNU_tzd/view?usp=drive_link",
    "https://drive.google.com/file/d/1kDs-yUzyDlEgEF-iKqwVViOsBOGBYR2W/view?usp=drive_link",
    "https://drive.google.com/file/d/10ABjKYDNFJ__Nkg_ahTdGBb0g0BLO6m-/view?usp=drive_link",
    "https://drive.google.com/file/d/1O_LMJezGCDorzVqrtG2zbDFu0C3_WEbK/view?usp=drive_link",
    "https://drive.google.com/file/d/1LgCO_XaPU8iZT5OH3WlPgMnLjL8iJfZz/view?usp=drive_link",
    "https://drive.google.com/file/d/1KcqdNVxaFXWKXbQerrVomr5Z3eP-105g/view?usp=drive_link",
    "https://drive.google.com/file/d/1pujiSvWX7UrdMaEVtbz1btslKI58Gy1w/view?usp=drive_link",
  ],

  "FOG Essentials 1977 Hoodie_темно-серый": [
    "https://drive.google.com/file/d/1za-NnxYvyJN9OuH_wobbKdCaapWOBMw7/view?usp=drive_link",
    "https://drive.google.com/file/d/1fNuArokbwlSA1uLbwhcZjzkQGZYWuFrE/view?usp=drive_link",
    "https://drive.google.com/file/d/1Q_spu9tCSz1jQhAem-DjRy9yC5MmfVgY/view?usp=drive_link",
    "https://drive.google.com/file/d/1fMElcMgA1yGa15OAj-Ufy0nCq-J3MUHg/view?usp=drive_link",
    "https://drive.google.com/file/d/1WhVAUeVMGRXgYdo0hSaL896P3QRLngsc/view?usp=drive_link",
    "https://drive.google.com/file/d/1E04hOgGW_y0KHbs1l36VhZ5vx-a5V-5C/view?usp=drive_link",
    "https://drive.google.com/file/d/1U4B94faQDusAuXu34XezHyafTVlj5YXP/view?usp=drive_link",
    "https://drive.google.com/file/d/1_f_gRDKQM8_cmttF0Sz9ea5B6r77wRAk/view?usp=drive_link",
  ],
};


// Хелпер: view → прямой Google Drive URL
const toDirectDriveUrl = (url: string) => {
  const match = url.match(/\/d\/([^/]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

// ОПИСАНИЯ ПО ГРУППАМ

const descRevengexBaggy = {
  en: "Unisex baggy flare jeans made from heavyweight 16oz washed cotton denim. The loose flared silhouette with embroidered back pockets and a full 100% cotton construction gives a structured drape and all-day comfort.",
  ru: "Унисекс джинсы кроя baggy flare из плотного 16-унцевого хлопкового денима с эффектом стирки. Свободный расклёшенный силуэт и вышивка на задних карманах в сочетании со 100% хлопком обеспечивают выразительную посадку и комфорт на каждый день.",
  kg: "Унисекс baggy flare джинсы калың 16 унциялык жуулган пахта денимден тигилген. Артындагы чөнтөктөрүндөгү сайма жана 100% пахта кездеме кенен, ылдыйдан кеңейген силуэтти жана күнү бою ыңгайлуулукту камсыздайт.",
};

const descRevengexZipped = {
  en: "Unisex flare-fit jeans in heavyweight 16oz washed cotton denim with embroidered back pockets. Adjustable ankle zippers let you switch the opening from straight to a dramatic flare, while the 100% cotton fabric keeps the jeans structured yet comfortable.",
  ru: "Унисекс джинсы кроя flare fit из плотного 16-унцевого хлопкового денима с эффектом стирки и вышивкой на задних карманах. Молнии на щиколотках позволяют регулировать ширину низа от прямого до выраженного клёша, а 100% хлопок сохраняет форму и остаётся комфортным в носке.",
  kg: "Унисекс flare fit джинсы калың 16 унциялык жуулган пахта денимден, арткы чөнтөктөрүндө сайма менен. Буттун учтарындагы зыпылдактар оозду түздөн күчтүү клёшка чейинки деңгээлде жөнгө салууга мүмкүндүк берет, ал эми 100% пахта кездеме формасын жакшы кармап, денеде ыңгайлуу отурат.",
};

const descFogUnionHoodie = {
  en: "Fear of God Essentials × Union LA pullover hoodie with a brushed fleece lining and a relaxed drop-shoulder fit. Custom-woven and garment-dyed fabric, a 3D liquid silicone logo print on the back and a double-layer hood with the signature Essentials label make this one of the season’s most versatile winter staples (380gsm, 80% cotton / 20% polyester).",
  ru: "Пуловер-худи Fear of God Essentials × Union LA с мягким начёсом и свободным силуэтом с опущенной линией плеча. Индивидуально изготовленный и окрашенный трикотаж, объёмный 3D-логотип из жидкого силикона на спине и двойной капюшон с фирменным ярлыком Essentials делают модель одним из самых универсальных хитов зимнего сезона (плотность 380 г/м², 80% хлопок / 20% полиэстер).",
  kg: "Fear of God Essentials × Union LA капюшон-худиси ичинен начёстуу флис жана түшүрүлгөн ийини бар эркин фасондо. Заказ менен токулган жана боёлгон кездеме, аркадагы 3D суюк силикон логотиби жана фирмалык Essentials лейбли бар эки катмарлуу капюшон бул моделди кышкы сезон үчүн эң универсалдуу нерселердин бири кылат (380 г/м² флис, 80% пахта / 20% полиэстер).",
};

const descFogUnionPants = {
  en: "Fear of God Essentials × Union LA jogger sweatpants with a relaxed tapered fit and brushed fleece lining. Pre-shrunk custom-woven fleece with a logo print on the lower leg, an elastic drawstring waist and cuffed hems delivers a soft yet structured look that works for both lounging and streetwear (380gsm, 80% cotton / 20% polyester).",
  ru: "Джоггеры Fear of God Essentials × Union LA с расслабленным зауженным кроем и мягким начёсом. Предусаженный флис индивидуальной выработки с логотипом на голени, эластичный пояс со шнурком и манжеты по низу создают мягкий, но аккуратный силуэт, подходящий и для повседневной носки, и для стритвира (плотность 380 г/м², 80% хлопок / 20% полиэстер).",
  kg: "Fear of God Essentials × Union LA спорттук шымдары эркин, ылдыйынан тарылган фасондо жана ичинен начёстуу флис менен. Алдын ала жыйрылтылган заказдык флис, буттун төмөн жагындагы логотип, шнурку бар резинкалуу бел жана манжеттүү ооздор жумшак, бирок тыкан силуэт жаратып, даамдуу стрит-стильге да, үйдөгү жайдары кийимге да жарашат (380 г/м² флис, 80% пахта / 20% полиэстер).",
};

const descFogHolidayHoodie = {
  en: "Fear of God Essentials Holiday Classic hoodie with a 3D silicone logo print on the chest and a brushed fleece lining. The relaxed drop-shoulder fit, hidden side pockets, double-layer hood with a translucent Essentials Fear of God label and upgraded trims make it a premium winter essential (380gsm, 80% cotton / 20% polyester).",
  ru: "Худи Fear of God Essentials Holiday Classic с объёмным силиконовым логотипом на груди и мягким начёсом. Свободный крой с опущенной линией плеча, спрятанные боковые карманы, двойной капюшон с полупрозрачным ярлыком Essentials Fear of God и обновлённая фурнитура подчёркивают премиальный характер модели (плотность 380 г/м², 80% хлопок / 20% полиэстер).",
  kg: "Fear of God Essentials Holiday Classic худиси көкүрөк бөлүгүндөгү 3D силикон логотиби жана ичинен начёстуу флис менен. Түшүрүлгөн ийини бар эркин фасон, капталындагы жашыруун чөнтөктөр жана Essentials Fear of God лейбли бар эки катмарлуу капюшон жаңыртылган фурнитура менен коштолуп, бул моделди кышка арналган премиум худиге айландырат (380 г/м² флис, 80% пахта / 20% полиэстер).",
};

const descAlberniJacket = {
  en: "Canada Goose Alberni reversible jacket with two distinct looks in one piece. One side features a clean matte woven nylon that is water- and stain-resistant for daily commutes and outdoor use, while the reverse side offers plush sherpa fleece for extra warmth and comfort.",
  ru: "Двусторонняя куртка Canada Goose Alberni, сочетающая два образа в одной вещи. Одна сторона выполнена из матового тканого нейлона с водо- и грязеотталкивающей пропиткой для города и активного отдыха, другая — из мягкого шерпа-флиса, обеспечивающего дополнительное тепло и уют.",
  kg: "Эки тараптуу Canada Goose Alberni курткасы бир кийимде эки ар башка образды сунуштайт. Бир тарабы шаардагы күнүмдүк кийүүгө жана ачык абада жүрүүгө ылайыктуу, суу жана кир өткөрбөс матикалык нейлондон жасалган, экинчи тарабы жумшак шерпа-флис болуп кошумча жылуулук жана жайлуулукту камсыздайт.",
};

const desc1977Crewneck = {
  en: "Fear of God Essentials 1977 crewneck sweatshirt with a brushed fleece lining and a relaxed raglan fit. The raised flocked 1977 logo on the chest, drop-shoulder silhouette and updated trims make it a clean, modern staple for everyday winter wear (380gsm, 80% cotton / 20% polyester).",
  ru: "Свитшот Fear of God Essentials 1977 с мягким начёсом и свободным реглан-кроем. Объёмный ворсовый логотип 1977 на груди, опущенная линия плеча и обновлённая фурнитура создают лаконичный современный образ для повседневной зимней носки (плотность 380 г/м², 80% хлопок / 20% полиэстер).",
  kg: "Fear of God Essentials 1977 свитшоту ичинен начёстуу флис жана эркин реглан фасон менен. Көкүрөктөгү көтөрүлүп турган ворс 1977 логотиби, түшүрүлгөн ийини жана жаңыртылган деталдары күнүмдүк кышкы кийим үчүн заманбап, таза образ түзөт (380 г/м² флис, 80% пахта / 20% полиэстер).",
};

const desc1977Pants = {
  en: "Fear of God Essentials 1977 jogger sweatpants with a relaxed tapered fit and brushed fleece lining. The flocked 1977 logo near the pocket, elastic drawstring waist, ribbed gusset and cuffed hems create a comfortable, structured silhouette that pairs perfectly with the matching tops (380gsm, 80% cotton / 20% polyester).",
  ru: "Джоггеры Fear of God Essentials 1977 с расслабленным зауженным кроем и мягким начёсом. Ворсовый логотип 1977 у кармана, эластичный пояс со шнурком, ластовица из эластичного ребра и манжеты по низу обеспечивают комфортный и аккуратный силуэт, который идеально сочетается с верхами из той же линейки (плотность 380 г/м², 80% хлопок / 20% полиэстер).",
  kg: "Fear of God Essentials 1977 спорттук шымдары эркин, ылдыйынан тарылган фасондо жана ичинен начёстуу флис менен. Чөнтөк жанындагы ворс 1977 логотиби, шнурку бар резинкалуу бел, ийкемдүү ребристүү ластовица жана манжеттүү ооздор ыңгайлуу жана тыкан силуэт берет, коллекциядагы жогору кийимдер менен мыкты айкалышат (380 г/м² флис, 80% пахта / 20% полиэстер).",
};

const desc1977Hoodie = {
  en: "Fear of God Essentials 1977 hoodie with a brushed fleece lining and a relaxed drop-shoulder fit. The flocked 1977 logo on the chest, kangaroo pocket, double-layer hood with an Essentials Fear of God label and upgraded trims make this a go-to statement hoodie for the colder months (380gsm, 80% cotton / 20% polyester).",
  ru: "Худи Fear of God Essentials 1977 с мягким начёсом и свободным силуэтом с опущенной линией плеча. Ворсовый логотип 1977 на груди, «кенгуру»-карман, двойной капюшон с ярлыком Essentials Fear of God и обновлённая фурнитура делают модель ключевой вещью в гардеробе на холодный сезон (плотность 380 г/м², 80% хлопок / 20% полиэстер).",
  kg: "Fear of God Essentials 1977 худиси ичинен начёстуу флис жана түшүрүлгөн ийини бар эркин фасондо. Көкүрөктөгү ворс 1977 логотиби, «кенгуру» чөнтөгү, фирмалык Essentials Fear of God лейбли бар эки катмарлуу капюшону жана жаңыртылган фурнитурасы менен бул модель суук мезгил үчүн негизги худиге айланат (380 г/м² флис, 80% пахта / 20% полиэстер).",
};

// СПИСОК ПРОДУКТОВ ИЗ ТАБЛИЦЫ

type SizeRange = "XS-XL" | "S-XL";

interface RawProductSeed {
  name: string;
  brand: string;
  descGroup:
    | "revengexBaggy"
    | "revengexZipped"
    | "fogUnionHoodie"
    | "fogUnionPants"
    | "fogHolidayHoodie"
    | "alberniJacket"
    | "1977Crewneck"
    | "1977Pants"
    | "1977Hoodie";
  categoryRu: string;
  sizeRange: SizeRange;
  colorRu: string;
  price: number; // Final Price (сом)
  mainImageUrl: string; // первая ссылка из строки
}

// 24 строки → 24 объекта
const rawProducts: RawProductSeed[] = [
  // REVENGEX BAGGY FLARE JEANS
  {
    name: "REVENGEX BAGGY FLARE JEANS",
    brand: "REVENGEX",
    descGroup: "revengexBaggy",
    categoryRu: "Джинсы",
    sizeRange: "XS-XL",
    colorRu: "чёрный",
    price: 5125,
    mainImageUrl: "https://drive.google.com/file/d/1wrcz31RQqC4UkaIqZ-EN7CDbTGdNTtmt/view?usp=drive_link",
  },
  {
    name: "REVENGEX BAGGY FLARE JEANS",
    brand: "REVENGEX",
    descGroup: "revengexBaggy",
    categoryRu: "Джинсы",
    sizeRange: "XS-XL",
    colorRu: "серый",
    price: 5125,
    mainImageUrl: "https://drive.google.com/file/d/1fOhfoBvsLElcxKFE498X3axu2FfvOKUh/view?usp=drive_link",
  },
  {
    name: "REVENGEX BAGGY FLARE JEANS",
    brand: "REVENGEX",
    descGroup: "revengexBaggy",
    categoryRu: "Джинсы",
    sizeRange: "XS-XL",
    colorRu: "голубой",
    price: 5125,
    mainImageUrl: "https://drive.google.com/file/d/1CV3EEJg-Tko45erRBa2cIQV8L1-TJGE5/view?usp=drive_link",
  },

  // REVENGEX FLARE FIT ZIPPED JEAN
  {
    name: "REVENGEX FLARE FIT ZIPPED JEAN",
    brand: "REVENGEX",
    descGroup: "revengexZipped",
    categoryRu: "Джинсы",
    sizeRange: "XS-XL",
    colorRu: "голубой",
    price: 5125,
    mainImageUrl: "https://drive.google.com/file/d/1v1PI3E6K96qdMaOGyb5YlN7OVz6KuvY8/view?usp=drive_link",
  },
  {
    name: "REVENGEX FLARE FIT ZIPPED JEAN",
    brand: "REVENGEX",
    descGroup: "revengexZipped",
    categoryRu: "Джинсы",
    sizeRange: "XS-XL",
    colorRu: "серый",
    price: 5125,
    mainImageUrl: "https://drive.google.com/file/d/1yGac0Zsbsl4H9I4slW6iHaKLldxR-wv_/view?usp=drive_link",
  },
  {
    name: "REVENGEX FLARE FIT ZIPPED JEAN",
    brand: "REVENGEX",
    descGroup: "revengexZipped",
    categoryRu: "Джинсы",
    sizeRange: "XS-XL",
    colorRu: "чёрный",
    price: 5125,
    mainImageUrl: "https://drive.google.com/file/d/10Ot_xa6k2whHso303Soo5WyK9ja0U16s/view?usp=drive_link",
  },

  // FOG Essentials × Union LA Hoodie
  {
    name: "FOG Essentials × Union LA Hoodie",
    brand: "Fear of God Essentials × Union LA",
    descGroup: "fogUnionHoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "зелёный",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1T-6jP8Z2-HtWubLTIaeTiYHdp33BqjK3/view?usp=drive_link",
  },
  {
    name: "FOG Essentials × Union LA Hoodie",
    brand: "Fear of God Essentials × Union LA",
    descGroup: "fogUnionHoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "белый",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1qzQpP1b36IVGxkCiQIrYXzZaww5E_Xp-/view?usp=drive_link",
  },
  {
    name: "FOG Essentials × Union LA Hoodie",
    brand: "Fear of God Essentials × Union LA",
    descGroup: "fogUnionHoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "чёрный",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1N47as3t7Qib59IOuKCGwKoNX_Mmj0rJh/view?usp=drive_link",
  },

  // FOG Essentials × Union LA Sweatpants
  {
    name: "FOG Essentials × Union LA Sweatpants",
    brand: "Fear of God Essentials × Union LA",
    descGroup: "fogUnionPants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "зелёный",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1vbPMMDMw4FE9fGkMfRcuvPM6nn0Z-dXA/view?usp=drive_link",
  },
  {
    name: "FOG Essentials × Union LA Sweatpants",
    brand: "Fear of God Essentials × Union LA",
    descGroup: "fogUnionPants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "белый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1LGbxzppJxyMTnkX5HNOtvAapI5wZmUj1/view?usp=drive_link",
  },
  {
    name: "FOG Essentials × Union LA Sweatpants",
    brand: "Fear of God Essentials × Union LA",
    descGroup: "fogUnionPants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "чёрный",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/137bx65wGCkE_mvrkMOHKBYXJIbEFmrVv/view?usp=drive_link",
  },

  // FOG Essentials Holiday Classic Hoodie
  {
    name: "FOG Essentials Holiday Classic Hoodie",
    brand: "Fear of God Essentials",
    descGroup: "fogHolidayHoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "винтажный чёрный",
    price: 4500,
    mainImageUrl: "https://drive.google.com/file/d/1Gy4rgqy3Ss6Zt6XcLYVLQqpzHQjzjQX-/view?usp=drive_link",
  },

  // Canada Goose Alberni Reversible Jacket
  {
    name: "Canada Goose Alberni Reversible Jacket",
    brand: "Canada Goose",
    descGroup: "alberniJacket",
    categoryRu: "Куртка",
    sizeRange: "S-XL",
    colorRu: "чёрный",
    price: 8500,
    mainImageUrl: "https://drive.google.com/file/d/1Sj93F2BardOS8M6ryxVUCsc54j-ezgo5/view?usp=drive_link",
  },
  {
    name: "Canada Goose Alberni Reversible Jacket",
    brand: "Canada Goose",
    descGroup: "alberniJacket",
    categoryRu: "Куртка",
    sizeRange: "S-XL",
    colorRu: "серо-белый",
    price: 8500,
    mainImageUrl: "https://drive.google.com/file/d/1Sj93F2BardOS8M6ryxVUCsc54j-ezgo5/view?usp=drive_link",
  },
  {
    name: "Canada Goose Alberni Reversible Jacket",
    brand: "Canada Goose",
    descGroup: "alberniJacket",
    categoryRu: "Куртка",
    sizeRange: "S-XL",
    colorRu: "хаки-зелёный",
    price: 8500,
    mainImageUrl: "https://drive.google.com/file/d/1Sj93F2BardOS8M6ryxVUCsc54j-ezgo5/view?usp=drive_link",
  },

  // FOG Essentials 1977 Crewneck
  {
    name: "FOG Essentials 1977 Crewneck",
    brand: "Fear of God Essentials",
    descGroup: "1977Crewneck",
    categoryRu: "Свитшот",
    sizeRange: "S-XL",
    colorRu: "бежевый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1BKn40N5JbFsUSo6I2t_teFVQ8NGvI1ZK/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Crewneck",
    brand: "Fear of God Essentials",
    descGroup: "1977Crewneck",
    categoryRu: "Свитшот",
    sizeRange: "S-XL",
    colorRu: "черный",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1j-e042OOFbr9OCet_VvCAv2OGKhfN_yN/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Crewneck",
    brand: "Fear of God Essentials",
    descGroup: "1977Crewneck",
    categoryRu: "Свитшот",
    sizeRange: "S-XL",
    colorRu: "светло-серый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1Ga8Bp9eJp6wWOx7rpDXW-2dnUP1YUs1S/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Crewneck",
    brand: "Fear of God Essentials",
    descGroup: "1977Crewneck",
    categoryRu: "Свитшот",
    sizeRange: "S-XL",
    colorRu: "темно-серый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1NWTd4qL7Bq16WbAkoVeHD1zfVNjSdSgI/view?usp=drive_link",
  },

  // FOG Essentials 1977 Sweatpants
  {
    name: "FOG Essentials 1977 Sweatpants",
    brand: "Fear of God Essentials",
    descGroup: "1977Pants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "бежевый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1jXnE7a-cRy77EtXhIJ-ndHWr2cQPYPtE/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Sweatpants",
    brand: "Fear of God Essentials",
    descGroup: "1977Pants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "черный",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1iAESG6FmqVKTM_h47k0Bn_fHXLPPUSUi/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Sweatpants",
    brand: "Fear of God Essentials",
    descGroup: "1977Pants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "светло-серый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1r_K-ywsoTy9yqwj_NvfjmcVXhJs_aoRM/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Sweatpants",
    brand: "Fear of God Essentials",
    descGroup: "1977Pants",
    categoryRu: "Брюки",
    sizeRange: "S-XL",
    colorRu: "темно-серый",
    price: 4375,
    mainImageUrl: "https://drive.google.com/file/d/1za-NnxYvyJN9OuH_wobbKdCaapWOBMw7/view?usp=drive_link",
  },

  // FOG Essentials 1977 Hoodie
  {
    name: "FOG Essentials 1977 Hoodie",
    brand: "Fear of God Essentials",
    descGroup: "1977Hoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "бежевый",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1CgrrInaHpDmUc3YBSQegivJeFLRaou4H/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Hoodie",
    brand: "Fear of God Essentials",
    descGroup: "1977Hoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "черный",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1jHlkIsTh4BxjqdtSpl_1TzP_HaKlNx5t/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Hoodie",
    brand: "Fear of God Essentials",
    descGroup: "1977Hoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "светло-серый",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1fj2BuP3HXGPsyw8tRd8nb0mVi26SnxCG/view?usp=drive_link",
  },
  {
    name: "FOG Essentials 1977 Hoodie",
    brand: "Fear of God Essentials",
    descGroup: "1977Hoodie",
    categoryRu: "Худи",
    sizeRange: "S-XL",
    colorRu: "темно-серый",
    price: 4625,
    mainImageUrl: "https://drive.google.com/file/d/1za-NnxYvyJN9OuH_wobbKdCaapWOBMw7/view?usp=drive_link",
  },
];

// Маппинг descGroup → описание
const descByGroup = {
  revengexBaggy: descRevengexBaggy,
  revengexZipped: descRevengexZipped,
  fogUnionHoodie: descFogUnionHoodie,
  fogUnionPants: descFogUnionPants,
  fogHolidayHoodie: descFogHolidayHoodie,
  alberniJacket: descAlberniJacket,
  "1977Crewneck": desc1977Crewneck,
  "1977Pants": desc1977Pants,
  "1977Hoodie": desc1977Hoodie,
} as const;

// СИД ПРОДУКТОВ

const normalizeColorKey = (ru: string) =>
  ru
    .trim()
    .toLowerCase()
    .replace("ё", "е")
    .replace(/\s+/g, "-"); // e.g. "темно серый" → "темно-серый"

export async function seedProducts(database: any) {
  for (const p of rawProducts) {
    const desc = descByGroup[p.descGroup];

    // Convert Russian color to lowercase-key version used in image map
    const colorKey = normalizeColorKey(p.colorRu);

    // Build the key used in productImages
    const productKey = `${p.name}_${colorKey}`;

    if (!productImages[productKey]) {
      console.error("Missing image set for:", productKey);
      continue;
    }

    await database.product.create({
      data: {
        storeId,
        categoryId: categoryIdByRu[p.categoryRu],
        name: p.name,
        nameRu: p.name,
        nameKg: p.name,
        brand: p.brand,
        description: desc.en,
        descriptionRu: desc.ru,
        descriptionKg: desc.kg,
        price: p.price,
        weight: 0.8,

        sizes: {
          connect: sizeRangeToIds[p.sizeRange].map((id) => ({ id })),
        },

        colors: {
          connect: [{ id: colorIdByRu[p.colorRu] }],
        },

        images: {
          create: productImages[productKey].map((url) => ({
            url: toDirectDriveUrl(url),
          })),
        },
      },
    });

    console.log("Created product:", productKey);
  }
}

seedProducts(database)