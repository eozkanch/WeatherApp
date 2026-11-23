export interface Coords {
  lat: number;
  lon: number;
}

/** Tarayıcı konumunu Promise olarak döndürür; hatalar kullanıcıya gösterilebilir mesajlıdır. */
export function getCurrentCoords(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      reject(new Error('Location is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            reject(new Error('Location permission denied. You can search for a city instead.'));
            break;
          case err.TIMEOUT:
            reject(new Error('Location request timed out. Please try again.'));
            break;
          default:
            reject(new Error('Could not determine your location.'));
        }
      },
      // Düşük hassasiyet yeterli (şehir düzeyi) ve daha hızlı; 10 dk eski konum kabul
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10 * 60 * 1000 }
    );
  });
}
