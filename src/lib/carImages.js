// Verified Wikimedia Commons 960px thumbnails — all confirmed 200 OK
// Generated via Commons API: https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=thumburl&iiurlwidth=800
const CAR_IMAGES = {
  'Maruti Suzuki|Alto K10':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Suzuki_Alto_800_GL_2011.jpg/960px-Suzuki_Alto_800_GL_2011.jpg',

  'Maruti Suzuki|Swift':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2025_Suzuki_Swift_hybrid_in_Flame_Orange_Metallic%2C_front_left%2C_06-06-2025.jpg/960px-2025_Suzuki_Swift_hybrid_in_Flame_Orange_Metallic%2C_front_left%2C_06-06-2025.jpg',

  'Hyundai|i20':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg/960px-Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg',

  'Tata|Punch':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2021_Tata_Punch_Creative_%28India%29_front_view_01.png/960px-2021_Tata_Punch_Creative_%28India%29_front_view_01.png',

  'Maruti Suzuki|Baleno':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg/960px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg',

  'Maruti Suzuki|Dzire':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Suzuki_Dzire_II_1.2_GLX_Hybrid_Magma_Gray_Metallic_01.jpg/960px-Suzuki_Dzire_II_1.2_GLX_Hybrid_Magma_Gray_Metallic_01.jpg',

  'Honda|Amaze':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2024_Honda_Amaze_ZX.png/960px-2024_Honda_Amaze_ZX.png',

  'Hyundai|Verna':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Hyundai_Accent_1.5_MPI_Smart%2B_%28VI%29_%E2%80%93_f_08032025.jpg/960px-Hyundai_Accent_1.5_MPI_Smart%2B_%28VI%29_%E2%80%93_f_08032025.jpg',

  'Maruti Suzuki|Brezza':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/2022_Maruti_Suzuki_Brezza_ZXi%2B_%28India%29_front_view_02.png/960px-2022_Maruti_Suzuki_Brezza_ZXi%2B_%28India%29_front_view_02.png',

  'Hyundai|Venue':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/4th_International_Auto_Show%2C_Bangalore_%282025%29_07.jpg/960px-4th_International_Auto_Show%2C_Bangalore_%282025%29_07.jpg',

  'Kia|Sonet':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2021_Kia_Sonet_1.5_Premiere_%28Indonesia%29_front_view_02.jpg/960px-2021_Kia_Sonet_1.5_Premiere_%28Indonesia%29_front_view_02.jpg',

  'Tata|Nexon':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/960px-Tata_Nexon_Blue_Dual_Tone.jpg',

  'Hyundai|Creta':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Moscow%2C_Hyundai_Creta_%282nd_gen%29_Aug_2025_01_%28cropped%29.jpg/960px-Moscow%2C_Hyundai_Creta_%282nd_gen%29_Aug_2025_01_%28cropped%29.jpg',

  'Kia|Seltos':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Kia_Seltos_X-line.jpg/960px-Kia_Seltos_X-line.jpg',

  'Maruti Suzuki|Ertiga':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Suzuki_Ertiga_NC_FL_1.5_GLX_Hybrid_Snow_White_Pearl.jpg/960px-Suzuki_Ertiga_NC_FL_1.5_GLX_Hybrid_Snow_White_Pearl.jpg',

  'Toyota|Innova Crysta':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/2017_Toyota_Kijang_Innova_2.0_G_wagon_%28TGN140R%3B_01-19-2019%29%2C_South_Tangerang.jpg/960px-2017_Toyota_Kijang_Innova_2.0_G_wagon_%28TGN140R%3B_01-19-2019%29%2C_South_Tangerang.jpg',

  'Tata|Nexon EV':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2020_Tata_Nexon_EV_%28India%29_front_view.png/960px-2020_Tata_Nexon_EV_%28India%29_front_view.png',

  'MG|ZS EV':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/MG_ZS_EV_Facelift_1X7A5867.jpg/960px-MG_ZS_EV_Facelift_1X7A5867.jpg',

  'Mahindra|XUV700':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png/960px-2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png',

  'Toyota|Fortuner':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2018_Toyota_Fortuner_2.4_VRZ_4x2_wagon_%28GUN165R%3B_02-18-2019%29%2C_South_Tangerang.jpg/960px-2018_Toyota_Fortuner_2.4_VRZ_4x2_wagon_%28GUN165R%3B_02-18-2019%29%2C_South_Tangerang.jpg',
};

export function getCarImage(make, model) {
  return CAR_IMAGES[`${make}|${model}`] ?? null;
}
