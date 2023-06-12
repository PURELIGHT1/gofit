export const formatDate = (date) => {
  const tanggalLahir = new Date(date);

  const formattedDate = tanggalLahir.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

export const formatDate2 = (date) => {
  const tanggalLahir = new Date(date);

  const formattedDate = tanggalLahir.toLocaleDateString("id-ID",{ day: "2-digit"})
  + "/" + tanggalLahir.toLocaleDateString("id-ID",{ month: "2-digit"})
  + "/" + tanggalLahir.toLocaleDateString("id-ID",{ year: "numeric"});
  // +" " + tanggalLahir.toLocaleTimeString();
  return formattedDate;
};


export const formatDate3 = (date) => {
  const tanggalLahir = new Date(date);

 const formattedDate = tanggalLahir.toLocaleDateString("id-ID",{ month: "long"})
  + " " + tanggalLahir.toLocaleDateString("id-ID",{ day: "2-digit"});

  return formattedDate;
};

export const formatMoney = (rp) => {
  return rp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function formatMoney2(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);
}


export const formatDateShow = (date) => {
  const tanggalLahir = new Date(date);
  const formattedDate = tanggalLahir.toISOString().slice(0, 10);
  return formattedDate;
};
