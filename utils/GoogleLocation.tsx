const locateAddress: any = async (apikey: any, address: any) => {
    console.log(apikey);

    let long = 0;
    let lat = 0;
    let message = ''
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`);
    const data = await res.json();

    if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        lat = location.lat;
        long = location.lng;
        return { lat, long }
    } else {
        message = 'Sorry! unable to locate address'
        return { message };
    }
}

export default locateAddress;