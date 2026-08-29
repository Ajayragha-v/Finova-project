require("dotenv").config();

async function villageGeocode(village) {
  const token = process.env.BHUVAN_TOKEN;

  const url =
    `https://bhuvan-app1.nrsc.gov.in/api/api_proximity/curl_village_geocode.php` +
    `?village=${encodeURIComponent(village)}` +
    `&token=${encodeURIComponent(token)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error(`Bhuvan API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    name: data[0].name,
    population: Number(data[0].tot_p),
    households: Number(data[0].no_hh),
    latitude: Number(data[0].latitude),
    longitude: Number(data[0].longitude),
    district: data[0].dist_name,
    tehsil: data[0].tehs_name,
    state: data[0].state_name,
  };
}

module.exports = villageGeocode;

villageGeocode("SEKURU").then(console.log).catch(console.error);
