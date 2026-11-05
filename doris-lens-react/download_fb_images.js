import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawUrls = [
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855436936_1733996602060542_754575973078308401_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=N1KGbfoRLQkQ7kNvwEMxvzE&_nc_oc=Adp4jdAXb3FfKu_iEmoen-KxjaeVKz_XJx_qDl6GaDFOe_PSelhju0a83-yaVWZG9eA&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQSmiGY-DcyMMJtLQcr4IlnfGUyL4U00-1URs6hfrkD51A&oe=6AF223C8",
  "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/855340388_1733996565393879_3578232004853659248_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_ohc=axJA5veXHpYQ7kNvwFICix4&_nc_oc=AdojxmDS9Su4bn4_wka36007jcQ9B64pyeXT8GtyF20v0bieBQKb2DA3Ehj3WreqMhc&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQSgHTZNgu6RVj7BapjAvrZoVQGpRkrDeMnNFhwV6v0cCQ&oe=6AF20CC3",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855436734_1733996585393877_1558936954061109103_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_ohc=acxoQ9TzjCEQ7kNvwH4i-Jl&_nc_oc=Adrk_W6OacUBXzqeqC1o0HpcTbCez1JNqEQwwzUNd9xCKTyGMQJjUFZCiIgcoAdypUE&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQRhSOj2XJqpgCkeRGHm-8HbhG2peJtXVHBhiJ2CVH5Peg&oe=6AF22BE2",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855436667_1733996618727207_1310369304865823340_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=108&ccb=1-7&_nc_sid=714c7a&_nc_ohc=s_RmAgINoW4Q7kNvwGIPwas&_nc_oc=AdpT6mHbg7kyqNEXGK1mZe8JiCdP0VlcpJ6V64ihrcfCdpFoB93F-BdoMZ002pNaYT8&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQS2oyztD19J91I8CbqyByMYTsCBnZsr5EyXJ7cQPHgoEA&oe=6AF1FF69",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/856123947_1735083325285203_3035798987127179408_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=106&ccb=1-7&_nc_sid=714c7a&_nc_ohc=44rYYYeWaOUQ7kNvwEwu9Mb&_nc_oc=AdrYaUACbLkyIpt2c07qy122_0nmmTF7XQt91nLIxWgVDIyI1LeaQl-IRzi08q-NW1I&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQSWyTRd0HSSfIaMWAkr6FDkslULvpEqTd7FgEHmKcYEeA&oe=6AF1FF8B",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855340247_1735083351951867_2384047742556135426_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=C0609KaMErQQ7kNvwGh5Oc_&_nc_oc=AdoP1vNWS5mxwOBu3CS0fM5BFOS3_RF424xmHk1QltEez43Sg_kDLYGnHh0sEvCNmcs&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQQTz4N-xUfPSs4q3S9KmsXZ53pBOLwv18pfKqhJJ1bL-g&oe=6AF2074D",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/853878033_1735083395285196_5778520476514675180_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=ryMwiVfQwRYQ7kNvwHd_ljX&_nc_oc=Adpxe8BKMQ9wSRE39WS-Ljlg9IIyCz2TfLIx1sGWkut93flDU8cUMRpFkJ1tIHfdIg0&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQR8czbm07VYsrxuWfmBJW2S0hwCkuXjKJGv0Bcktmpllw&oe=6AF22A4F",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855382545_1735083258618543_634752544115756241_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=101&ccb=1-7&_nc_sid=714c7a&_nc_ohc=JqB8GRERl7UQ7kNvwFc3FVN&_nc_oc=AdrxqGJUbptSiZ4rA5HQBLsSVkTyog_9CritpLdisLtDfR7eb-Roqh_tAA8FXvRD-ZI&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=KEXDXOmy2Xkivc_78g59BA&_nc_ss=7b289&oh=00_AQR3URcpBZEmo9pKoQKpmuWU1fyenNhqf2CGjukhpNwG7Q&oe=6AF20734",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855436598_1735083421951860_9130101865909821097_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=9py6lZx86OMQ7kNvwGMEm_0&_nc_oc=AdoYrY31Lkbvt9xZmrnf_fshPYHHkRLnGWHNy1hw_Wg-y_UJhE_Is0KIPh-FfkQSCOU&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQRlt6mUhvH_QtfqOW40Blf1HGKVXsSEhPm-WHA_Xdfu4g&oe=6AF204DC",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/857528458_1735083415285194_7212454616777782453_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=zbavT3sS8rEQ7kNvwH35rsh&_nc_oc=Adqj_-T4J_0uJCeQFr6KWlMw8mYKvMh5gPcTYiZpWO0ZEjYoiJSZf3XaER63wPD-chw&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQQelAjzOEpdLwiFqhjqGQXZHIPdpbhAVT7QXtFfw_hF8Q&oe=6AF2047F",
  "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/855382404_1735083388618530_1585485018843730305_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_ohc=6WByK-Q6w3oQ7kNvwEZroRL&_nc_oc=AdpQVnWA223zY_oHnXnwGwW88XBNnyb5dHcRUjO6yj57M65hm6PvlwYjiOomicLZXMk&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQRY6ZsLm65vgV4cKvU_Y6QC9r4meHBzBAQDE--vo28i9w&oe=6AF214EB",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855339706_1735083431951859_4326825557413124555_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=9cwsf0rAOr8Q7kNvwF5lYni&_nc_oc=Ador6Qg3yqYwLUN5ZH1iOX9L1LZWSPCW4m7y2LH0BDBEi9qzF1Pz-FGzJPWV-teNaW4&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQQMsBilkNK4QXOTe04h-lyc6zKmqYyyrmywX-_PQyqwXw&oe=6AF2110A",
  "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/855382142_1735083425285193_3249175809119654548_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=103&ccb=1-7&_nc_sid=714c7a&_nc_ohc=XQOE2FQAm5cQ7kNvwFEnjPc&_nc_oc=AdoABlvEqr4JHpGt3HkRvQQCV5LnngxsxbO_M8XHaA6kb401G2rxdwzlj9RHJVfKfjo&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQTfL72zLteY7NFjb3CjSpTRDizSFEIGLCLt3FyUeEjJAQ&oe=6AF22157",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855436990_1735083391951863_6799907555335834935_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=iNI-JgsTt1MQ7kNvwEQOpo-&_nc_oc=AdpMGoA-TONK_Iw7YzlaM-PI3thAwNafa7gpP5HlKwHTUEzj_IvpMpUGQvaBB2p1bv4&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQS_R1fZWR2AFIRxX2FS9VeGHFj2QAptCiY5J_IsjurwSQ&oe=6AF22A4D",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855382403_1735083428618526_3826350383364377339_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=fts3mgdRT-EQ7kNvwE59dhE&_nc_oc=Adpou1Lhn53-twCWK6xU4ldNoZnxk1VMpE9d6FCAfX-1WfdTcESBCWbnzubi5ieurLc&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQQ3naTr4o1_Z4qjYETaXd_-LdsPDUoU2FlDXzrQY1StHw&oe=6AF216FA",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855340230_1735083435285192_7010018011122602539_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=108&ccb=1-7&_nc_sid=714c7a&_nc_ohc=q2RTVhMDhfkQ7kNvwHvTatC&_nc_oc=AdriK_GnghbkyWqQNcif9vPgdSCQt90-PylAOtQHsUJePlqiOIgSKcXAAL7BWtcNucM&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=qUMDIVV9SutdczR-CxsGzA&_nc_ss=7b289&oh=00_AQSP7ujU5mJNLD7oKwkV3LT82TuIblhxl3IOntmArgUqqQ&oe=6AF208BB",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855437163_1735083418618527_2942928738426358670_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=101&ccb=1-7&_nc_sid=714c7a&_nc_ohc=0103zEEnsuUQ7kNvwHBXB_9&_nc_oc=AdrkSqrrSxKZfqC34bzgp3u0Q7byaieSe71rIB3k-LsvUQ25Nn237hl2VM_dIyqZDS0&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQSmYFbmX3JZ7fmwYAOS3Z3zqS-4zdCTtqIneq2ZpxTDHA&oe=6AF1FC98",
  "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/855382244_1735080098618859_2781286386330873031_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=102&ccb=1-7&_nc_sid=714c7a&_nc_ohc=5hoH_glY8dQQ7kNvwHSRgcs&_nc_oc=AdqEzgs2FA1-mDFvv0GPPbeXnYf1UNTiNSw9huFhz_POGvwLiciSa2xeZ6jyE9dCXGw&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQS9CB_xd4_EBJDvTAGw2Qbzt9rKVLKPQ7YUfUoxmSVlog&oe=6AF1F664",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855382572_1735080131952189_6547885431303708935_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=106&ccb=1-7&_nc_sid=714c7a&_nc_ohc=ORDV9rriGcgQ7kNvwE4hNls&_nc_oc=AdpmLuS4Pf_v7PAwueFdMCucHjrEridenOJThkFYVfIBXV3kumjD-rij1MgwyLyX2Q8&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQTHIBY0ikKiqBhfZzhswU-fk5HCWnWyLTRV1n8LA9YlwA&oe=6AF2265F",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855382208_1735080138618855_9184790070863323477_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=D4fqiX2pt-0Q7kNvwGAvZ8U&_nc_oc=Adpzq05zMoyEeoEkGkxAISnZZzglwa9RYOzZIiVyjGzfwhJg8H9WHJCW0hsiYWsjYvI&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQQS5neeV5DYOnH_A71G5ZvFv4IIn5Z3LsEJtV3U85qkog&oe=6AF2021A",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/856149477_1735080128618856_5379596795882299573_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=100&ccb=1-7&_nc_sid=714c7a&_nc_ohc=VDwjVrL1SKwQ7kNvwHK9xi4&_nc_oc=AdopjjdAHleCb3qHFOYeANsWOPuWom0ySsE7Y7bx0_AL6KsqrKsgC1B3WqBOR5-NX8g&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQTjE49SK4q9n8hgukGs3JUKtWV3TE5py0dDEso5BAj6pQ&oe=6AF1FB4A",
  "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/855340263_1735080095285526_5362398738886638209_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_ohc=DlR149VZPTAQ7kNvwHMiFhl&_nc_oc=AdpYvJF-FrhacPd8RqvQz0sU-H4tzVizrm90Dn0jHjczZJMhGQKy41vp58NjSfnDZfA&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQSJxDdjbMscFfnWThR9Mp1pBk2CfoW5BZWWA5SqVVsiCw&oe=6AF2094F",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855436597_1735080135285522_98386244405072581_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_ohc=nbUBvDFe-OQQ7kNvwH_K-9e&_nc_oc=AdoD2iPyZu4aY-Epano4nXBCnC9Mb2VZN4LMM87GHqehPoWOADsDjzA8pmhGaPACKSI&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQRhr9F-7ne2T0B3TeqkztU6CIU90FDXYe6dQbWrdYhAGQ&oe=6AF1FF73",
  "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/855339842_1735076415285894_5230580987960737001_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s552x414&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=_OIt5aQtdOoQ7kNvwG3OLiM&_nc_oc=AdofaCTpPW1MzYNRtqV1ZkVMoVboG33fmEB1ofXW8PFhWkOqMEU6pwlumDK7ioMh-i8&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=TjkUAtvjPa1g7v4Hcg9o2g&_nc_ss=7b289&oh=00_AQSiwv9vSFu5XDAWUmSR922RPvtbdezYSTIFQPdD-slH-Q&oe=6AF21C7D"
];

const destDir = path.resolve(__dirname, 'public/images/fb');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting HD download of ${rawUrls.length} Doris Contact Lens Facebook photos (1536x1536)...`);
  const downloadedFiles = [];

  for (let i = 0; i < rawUrls.length; i++) {
    // Remove &ctp= thumbnail downscaling parameter to get the full 1536x1536 resolution
    let cleanUrl = rawUrls[i].replace(/&amp;/g, '&').replace(/&ctp=[^&]*/g, '');
    const filename = `fb_photo_${String(i + 1).padStart(2, '0')}.jpg`;
    const target = path.join(destDir, filename);

    try {
      await download(cleanUrl, target);
      const stat = fs.statSync(target);
      console.log(`[${i + 1}/${rawUrls.length}] HD Downloaded ${filename} (${stat.size} bytes)`);
      downloadedFiles.push({ filename, path: target, size: stat.size });
    } catch (err) {
      console.warn(`HD download failed for ${filename}, trying fallback:`, err.message);
      // Fallback to original URL
      try {
        await download(rawUrls[i].replace(/&amp;/g, '&'), target);
        const stat = fs.statSync(target);
        console.log(`[${i + 1}/${rawUrls.length}] Fallback Downloaded ${filename} (${stat.size} bytes)`);
        downloadedFiles.push({ filename, path: target, size: stat.size });
      } catch (err2) {
        console.error(`Failed completely for ${filename}:`, err2.message);
      }
    }
  }

  console.log('Done downloading. Total HD files:', downloadedFiles.length);
}

run();
