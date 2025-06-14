interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
  province_code: string;
}

interface Ward {
  code: string;
  name: string;
  district_code: string;
}

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const res = await fetch('https://provinces.open-api.vn/api/p/');
    if (!res.ok) throw new Error('Failed to fetch provinces');
    return await res.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

export const getDistricts = async (provinceCode: string): Promise<District[]> => {
  try {
    const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    if (!res.ok) throw new Error('Failed to fetch districts');
    const province = await res.json();
    return province.districts || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};

export const getWards = async (districtCode: string): Promise<Ward[]> => {
  try {
    const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    if (!res.ok) throw new Error('Failed to fetch wards');
    const district = await res.json();
    return district.wards || [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    return [];
  }
};