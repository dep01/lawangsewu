import React from "react";
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from "react-flatpickr";

const DatePicker = ({ value, onChange, placeholder, dateFormat = "Y-m-d", disabled = false,name="" }) => {
  return (
    <Flatpickr
      value={value}
      name={name}
      options={{
        dateFormat: dateFormat,
        altFormat: dateFormat,
        altInput: true,
        onChange: onChange,
        theme: {
          // atur warna background dari tanggal yang dipilih menjadi #039BE5
          selected: "#039BE5",
          // atur warna font dari tanggal yang dipilih menjadi putih
          weekdaySelected: "#fff",
          // atur warna background dari tombol "Today" menjadi #039BE5
          today: "#039BE5",
          // atur warna background dari tanggal hari ini menjadi #D4E4FF
          todayBackground: "#E6F7FF",
          // atur warna font dari tanggal hari ini menjadi #039BE5
          todayText: "#039BE5",
          // atur warna background dari header (nama bulan dan tahun) menjadi #039BE5
          // dan atur warna font dari tahun menjadi putih
          head: {
            background: "#039BE5",
            color: "#fff"
          }
        },
        // tambahkan konfigurasi berikut
        locale: {
          firstDayOfWeek: 1, // dimulai dari Senin
          weekdays: {
            shorthand: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'], // nama hari dengan 3 huruf
            longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          },
          months: {
            shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // nama bulan dengan 3 huruf
            longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          },
          nextMonthAriaLabel: 'Next month', // teks aksesibilitas untuk tombol bulan berikutnya
          prevMonthAriaLabel: 'Previous month', // teks aksesibilitas untuk tombol bulan sebelumnya
          yearAriaLabel: 'Select year', // teks aksesibilitas untuk pilihan tahun
          monthAriaLabel: 'Select month',
        },
      }}
      placeholder={placeholder}
      disabled={disabled ? 'disabled' : ''}
    />
  );
};

export default DatePicker;