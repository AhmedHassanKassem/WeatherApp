const cities = [
    // Africa
    { name: 'Cairo', coords: { lat: 30.0444, lng: 31.2357 } }, // Egypt
    { name: 'Lagos', coords: { lat: 6.5244, lng: 3.3792 } }, // Nigeria
    { name: 'Johannesburg', coords: { lat: -26.2041, lng: 28.0473 } }, // South Africa
    { name: 'Cape Town', coords: { lat: -33.9249, lng: 18.4241 } }, // South Africa
    { name: 'Accra', coords: { lat: 5.6037, lng: -0.1869644 } }, // Ghana
    { name: 'Nairobi', coords: { lat: -1.2864, lng: 36.8172 } }, // Kenya
    { name: 'Dakar', coords: { lat: 14.7167, lng: -17.4677 } }, // Senegal
    { name: 'Luanda', coords: { lat: -8.8391, lng: 13.2894 } }, // Angola
    { name: 'Abidjan', coords: { lat: 5.3599517, lng: -4.0082563 } }, // Côte d'Ivoire
    { name: 'Algiers', coords: { lat: 36.7372, lng: 3.0823 } }, // Algeria
    { name: 'Addis Ababa', coords: { lat: 9.033, lng: 38.7 } }, // Ethiopia
    { name: 'Dar es Salaam', coords: { lat: -6.7924, lng: 39.2083 } }, // Tanzania
    { name: 'Kinshasa', coords: { lat: -4.4419, lng: 15.2663 } }, // DR Congo
    { name: 'Khartoum', coords: { lat: 15.5007, lng: 32.5599 } }, // Sudan
    { name: 'Casablanca', coords: { lat: 33.5731, lng: -7.5898 } }, // Morocco
    { name: 'Kampala', coords: { lat: 0.3476, lng: 32.5825 } }, // Uganda
    { name: 'Harare', coords: { lat: -17.8292, lng: 31.0522 } }, // Zimbabwe
    { name: 'Tunis', coords: { lat: 36.8065, lng: 10.1815 } }, // Tunisia
    { name: 'Freetown', coords: { lat: 8.4656, lng: -13.2317 } }, // Sierra Leone
    { name: 'Yaoundé', coords: { lat: 3.848, lng: 11.5021 } }, // Cameroon
    { name: 'Mogadishu', coords: { lat: 2.0469, lng: 45.3182 } }, // Somalia
    { name: 'Bamako', coords: { lat: 12.6392, lng: -8.0029 } }, // Mali
    { name: 'Lusaka', coords: { lat: -15.3875, lng: 28.3228 } }, // Zambia
    { name: 'NDjamena', coords: { lat: 12.134, lng: 15.0557 } },
    { name: 'Tripoli', coords: { lat: 32.8872, lng: 13.1913 } }, // Libya
    { name: 'Brazzaville', coords: { lat: -4.2634, lng: 15.2429 } }, // Republic of the Congo
    { name: 'Asmara', coords: { lat: 15.3229, lng: 38.925 } }, // Eritrea
    { name: 'Kigali', coords: { lat: -1.9536, lng: 30.0606 } }, // Rwanda
    { name: 'Nouakchott', coords: { lat: 18.0791, lng: -15.9785 } }, // Mauritania
    { name: 'Bujumbura', coords: { lat: -3.3614, lng: 29.3599 } }, // Burundi
  
    // Asia
    { name: 'Riyadh', coords: { lat: 24.7136, lng: 46.6753 } }, // Saudi Arabia
    { name: 'Baghdad', coords: { lat: 33.3152, lng: 44.3661 } }, // Iraq
    { name: 'Islamabad', coords: { lat: 33.6844, lng: 73.0479 } }, // Pakistan
    { name: 'Mumbai', coords: { lat: 19.0760, lng: 72.8777 } }, // India
    { name: 'Dhaka', coords: { lat: 23.8103, lng: 90.4125 } }, // Bangladesh
    { name: 'Manila', coords: { lat: 14.5995, lng: 120.9842 } }, // Philippines
    { name: 'Ho Chi Minh City', coords: { lat: 10.8231, lng: 106.6297 } }, // Vietnam
    { name: 'Bangkok', coords: { lat: 13.7563, lng: 100.5018 } }, // Thailand
    { name: 'Karachi', coords: { lat: 24.8607, lng: 67.0011 } }, // Pakistan
    { name: 'Istanbul', coords: { lat: 41.0082, lng: 28.9784 } }, // Turkey
    { name: 'Tokyo', coords: { lat: 35.6895, lng: 139.6917 } }, // Japan
    { name: 'Seoul', coords: { lat: 37.5665, lng: 126.9780 } }, // South Korea
    { name: 'Shanghai', coords: { lat: 31.2304, lng: 121.4737 } }, // China
    { name: 'Beijing', coords: { lat: 39.9042, lng: 116.4074 } }, // China
    { name: 'Delhi', coords: { lat: 28.6139, lng: 77.209 } }, // India
    { name: 'Singapore', coords: { lat: 1.3521, lng: 103.8198 } }, // Singapore
    { name: 'Kuala Lumpur', coords: { lat: 3.139, lng: 101.6869 } }, // Malaysia
    { name: 'Dubai', coords: { lat: 25.276987, lng: 55.296249 } }, // UAE
    { name: 'Jerusalem', coords: { lat: 31.7683, lng: 35.2137 } }, // Israel
    { name: 'Kolkata', coords: { lat: 22.5726, lng: 88.3639 } }, // India
    { name: 'Pyongyang', coords: { lat: 39.0392, lng: 125.7625 } }, // North Korea
    { name: 'Taipei', coords: { lat: 25.032, lng: 121.5654 } }, // Taiwan
    { name: 'Kathmandu', coords: { lat: 27.7172, lng: 85.324 } }, // Nepal
    { name: 'Hanoi', coords: { lat: 21.0285, lng: 105.8543 } }, // Vietnam
    { name: 'Sanaa', coords: { lat: 15.3694, lng: 44.191 } }, // Yemen
    { name: 'Muscat', coords: { lat: 23.6345, lng: 58.4328 } }, // Oman
    { name: 'Tehran', coords: { lat: 35.6892, lng: 51.389 } }, // Iran
    { name: 'Colombo', coords: { lat: 6.9271, lng: 79.8612 } }, // Sri Lanka
    { name: 'Baku', coords: { lat: 40.4093, lng: 49.8671 } }, // Azerbaijan
    { name: 'Ashgabat', coords: { lat: 37.9601, lng: 58.3261 } }, // Turkmenistan
    { name: 'Tbilisi', coords: { lat: 41.7151, lng: 44.8271 } }, // Georgia
    { name: 'Kuwait City', coords: { lat: 29.3759, lng: 47.9774 } }, // Kuwait
    { name: 'Athens', coords: { lat: 37.9838, lng: 23.7275 } }, // Europe
    { name: 'Vienna', coords: { lat: 48.2082, lng: 16.3738 } }, // Europe
    { name: 'Amsterdam', coords: { lat: 52.3676, lng: 4.9041 } }, // Europe
    { name: 'Stockholm', coords: { lat: 59.3293, lng: 18.0686 } }, // Europe
    { name: 'Oslo', coords: { lat: 59.9139, lng: 10.7522 } }, // Europe
    { name: 'Copenhagen', coords: { lat: 55.6761, lng: 12.5683 } }, // Europe
    { name: 'Dublin', coords: { lat: 53.3498, lng: -6.2603 } }, // Europe
    { name: 'Edinburgh', coords: { lat: 55.9533, lng: -3.1883 } }, // Europe
    { name: 'Zurich', coords: { lat: 47.3769, lng: 8.5417 } }, // Europe
    { name: 'Warsaw', coords: { lat: 52.2297, lng: 21.0122 } }, // Europe
    { name: 'Budapest', coords: { lat: 47.4979, lng: 19.0402 } }, // Europe
    { name: 'Prague', coords: { lat: 50.0755, lng: 14.4378 } }, // Europe
    { name: 'Lisbon', coords: { lat: 38.7223, lng: -9.1393 } }, // Europe
    { name: 'Helsinki', coords: { lat: 60.1695, lng: 24.9354 } }, // Europe
  ];
  
  export { cities };
  
