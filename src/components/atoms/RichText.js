import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichText = ({ content, onContentChange, showingTemplate = true }) => {
  const [editorContent, setEditorContent] = useState(content);
  const editorRef = useRef(null);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);

    onContentChange(data);
  };

  const suratKeterangan = () => {
    let template = '<p style="margin-right:0in;margin-left:0in;font-size:16px;margin:0in;margin-top:' +
            '0in;margin-bottom:12.75pt;text-align:center;line-height:150%;"><b><span style="f' +
            'ont-size:19px;line-height:150%;"><br></span></b></p><p style="margin-right:0in;m' +
            'argin-left:0in;font-size:16px;margin:0in;margin-top:0in;margin-bottom:12.75pt;te' +
            'xt-align:center;line-height:150%;"><b><span style="font-size:19px;line-height:15' +
            '0%;">SURAT KETERANGAN</span></b></p><p style="margin-right:0in;margin-left:0in;f' +
            'ont-size:16px;margin:0in;margin-top:0in;margin-bottom:12.75pt;text-align:center;' +
            'line-height:150%;"><b><span style="">Nomor: …./…./…./….</span></b></p><p style="' +
            'margin-right:0in;margin-left:0in;font-size:16px;margin:0in;margin-top:0in;margin' +
            '-bottom:12.75pt;text-align:center;line-height:150%;"><b><span style=""><br></spa' +
            'n></b></p><p style="margin-right:0in;margin-left:0in;font-size:16px;margin:0in;m' +
            'argin-top:0in;margin-bottom:12.75pt;line-height:150%;"><span style="">Yang berta' +
            'nda tangan di bawah ini :</span></p><p style="margin: 0in 9.6pt 0.0001pt 125.6pt' +
            '; font-size: 16px; text-indent: -120.5pt;"><span style="color: rgb(67, 67, 67);"' +
            '>Nama&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;</span><span style="color: rgb(67' +
            ', 67, 67);">….</span></p><p style="margin: 0.1pt 9.6pt 0.0001pt 125.6pt; font-si' +
            'ze: 16px; text-indent: -120.5pt;"><span style="color: rgb(67, 67, 67);">Alamat&n' +
            'bsp; &nbsp; &nbsp; &nbsp; : &nbsp;</span><span style="color: rgb(67, 67, 67);">…' +
            '.</span></p><p style="margin: 0.05pt 13.75pt 0.0001pt 125.6pt; font-size: 16px; ' +
            'text-indent: -120.5pt;"><span style="color: rgb(67, 67, 67);">Jabatan&nbsp; &nbs' +
            'p; &nbsp; : &nbsp;</span><span style="color: rgb(67, 67, 67);">….</span></p><p s' +
            'tyle="margin-right:0in;margin-left:0in;font-size:16px;margin:0in;margin-top:0in;' +
            'margin-bottom:12.75pt;line-height:150%;text-align:start;"><span style="">&nbsp;<' +
            '/span></p><p style="margin-right:0in;margin-left:0in;font-size:16px;margin:0in;m' +
            'argin-top:0in;margin-bottom:12.75pt;line-height:150%;text-align:start;"><span st' +
            'yle="">Dengan ini menerangkan bahwa :</span></p><p style="margin: 0in 9.6pt 0.00' +
            '01pt 125.6pt; font-size: 16px; text-indent: -120.5pt;"><span style="color: rgb(6' +
            '7, 67, 67);">Nama&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ' +
            '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;</span><span style="color: rgb(67, 67' +
            ', 67);">….</span></p><p style="margin: 0in 9.6pt 0.0001pt 125.6pt; font-size: 16' +
            'px; text-indent: -120.5pt;"><span style="color: rgb(67, 67, 67);">Tempat, Tangga' +
            'l Lahir&nbsp; :&nbsp; ....</span></p><p style="margin: 0.1pt 9.6pt 0.0001pt 125.' +
            '6pt; font-size: 16px; text-indent: -120.5pt;"><span style="color: rgb(67, 67, 67' +
            ');">Alamat&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ' +
            '&nbsp; &nbsp; &nbsp; : &nbsp;</span><span style="color: rgb(67, 67, 67);">….</sp' +
            'an></p><p style="margin: 0.05pt 13.75pt 0.0001pt 125.6pt; font-size: 16px; text-' +
            'indent: -120.5pt;"><span style="color: rgb(67, 67, 67);">No. KTP&nbsp; &nbsp; &n' +
            'bsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;</sp' +
            'an><span style="color: rgb(67, 67, 67);">….</span></p><p style="margin-right:0in' +
            ';margin-left:0in;font-size:16px;margin:0in;margin-top:0in;margin-bottom:12.75pt;' +
            'line-height:150%;text-align:start;"><span style="">&nbsp;</span></p><p style="ma' +
            'rgin-right:0in;margin-left:0in;font-size:16px;margin:0in;margin-top:0in;margin-b' +
            'ottom:12.75pt;text-align:start;line-height:150%;"><span style="">Adalah benar se' +
            'dang menjadi karyawan di …. terhitung sejak …. hingga sekarang dengan posisi …..' +
            ' Demikian keterangan ini kami buat atas permohonan orang yang bersangkutan dan a' +
            'gar dapat dipergunakan sebagaimana mestinya.</span></p><p style="margin-right:0i' +
            'n;margin-left:0in;font-size:16px;margin:0in;margin-top:0in;margin-bottom:12.75pt' +
            ';line-height:150%;text-align:start;"><span style="">&nbsp;</span></p><p style="m' +
            'argin-right:0in;margin-left:0in;font-size:16px;margin:0in;margin-top:0in;margin-' +
            'bottom:12.75pt;line-height:150%;text-align:start;"><span style="">…….., ……..</sp' +
            'an></p><p style="margin-right:0in;margin-left:0in;font-size:16px;margin:0in;marg' +
            'in-top:0in;margin-bottom:12.75pt;line-height:150%;text-align:start;"><span style' +
            '="">&nbsp;</span></p><p style="margin-right:0in;margin-left:0in;font-size:16px;m' +
            'argin:0in;margin-top:0in;margin-bottom:12.75pt;line-height:150%;text-align:start' +
            ';"><span style="">……..</span></p><p style="margin-right:0in;margin-left:0in;font' +
            '-size:16px;margin:0in;margin-top:0in;margin-bottom:12.75pt;line-height:150%;text' +
            '-align:start;"><span style="">……..</span></p><p style="margin-right:0in;margin-l' +
            'eft:0in;font-size:16px;margin:0in;margin-top:0in;margin-bottom:12.75pt;line-heig' +
            'ht:150%;text-align:start;"><span style="">……..</span></p><p style="margin-right:' +
            '0in;margin-left:0in;font-size:16px;margin:0in;line-height:150%;">&nbsp;</p>'
    setEditorContent(template)
    // editorRef.current.setData(template)
  }

  const suratKeputusan = () => {
      setEditorContent("<p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.05pt;f" +
              "ont-size:21px;font-weight:bold;text-decoration:underline;text-align:center;'><br" +
              "></p><p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.0" +
              "5pt;font-size:21px;font-weight:bold;text-decoration:underline;text-align:center;" +
              "'><u><span style='font-size:19px;color:#434343;text-decoration:none;'>SURAT KEPU" +
              "TUSAN</span></u></p><p style='margin:0in;font-size:16px;margin-top:1.6pt;margin-" +
              "right:0in;margin-bottom:.0001pt;margin-left:5.05pt;text-align:center;'><span sty" +
              "le='color:#434343;'>No.&nbsp;..../</span><span style='color:#434343;'>&hellip;.<" +
              "/span><span style='color:#434343;'>/</span><span style='color:#434343;'>&hellip;" +
              "./&hellip;.</span></p><p style='margin:0in;font-size:16px;'><span style='font-si" +
              "ze:19px;'>&nbsp;</span></p><p style='margin:0in;font-size:16px;margin-top:11.75p" +
              "t;margin-right:0in;margin-bottom:.0001pt;margin-left:5.05pt;'><span style='color" +
              ":#434343;'>Perihal</span><span style='color:#434343;'>&nbsp;</span><span style='" +
              "color:#434343;'>:</span><span style='color:#434343;'>&nbsp;</span><span style='c" +
              "olor:#434343;'>Pengangkatan</span><span style='color:#434343;'>&nbsp;</span><spa" +
              "n style='color:#434343;'>Karyawan</span><span style='color:#434343;'>&nbsp;</spa" +
              "n><span style='color:#434343;'>Tetap</span></p><p style='margin:0in;font-size:16" +
              "px;margin-top:.05pt;'>&nbsp;</p><p style='margin:0in;font-size:16px;margin-top:0" +
              "in;margin-right:5.15pt;margin-bottom:.0001pt;margin-left:5.05pt;text-align:justi" +
              "fy;'><span style='color:#434343;'>Setelah melakukan beberapa tahapan evaluasi te" +
              "rhadap kinerja Saudara&nbsp;</span><span style='color:#434343;'>&hellip;.</span>" +
              "<span style='color:#434343;'>&nbsp;terhitung mulai tanggal&nbsp;</span><span sty" +
              "le='color:#434343;'>&hellip;.</span><span style='color:#434343;'>&nbsp;dengan ja" +
              "batan sebagai</span><span style='color:#434343;'>&nbsp;</span><span style='color" +
              ":#434343;'>&hellip;. di &hellip;.</span><span style='color:#434343;'>, maka deng" +
              "an ini&nbsp;</span><span style='color:#434343;'>&hellip;.</span><span style='col" +
              "or:#434343;'>&nbsp;menganggap Sd</span><span style='color:#434343;'>r. &hellip;." +
              "</span><span style='color:#434343;'>&nbsp;</span><span style='color:#434343;'>te" +
              "lah memenuhi kriteria untuk diangkat menjadi karyawan tetap dengan ketentuan seb" +
              "agai&nbsp;berikut</span><span style='color:#434343;'>&nbsp;</span><span style='c" +
              "olor:#434343;'>:</span></p><p style='margin:0in;font-size:16px;margin-top:.2pt;'" +
              ">&nbsp;</p><p style='margin:0in;font-size:16px;margin-top:0in;margin-right:9.6pt" +
              ";margin-bottom:.0001pt;margin-left:125.6pt;text-indent:-120.5pt;'><span style='c" +
              "olor:#434343;'>Menimbang &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;Berdasarkan pengama" +
              "tan dan penilaian yang obyektif Sdr.&nbsp;</span><span style='color:#434343;'>&h" +
              "ellip;.</span></p><p style='margin:0in;font-size:16px;margin-top:.1pt;margin-rig" +
              "ht:9.6pt;margin-bottom:.0001pt;margin-left:125.6pt;text-indent:-120.5pt;'><span " +
              "style='color:#434343;'>Mengingat &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;Berd" +
              "asarkan Anggaran Dasar dan Peraturan Perusahaan&nbsp;</span><span style='color:#" +
              "434343;'>&hellip;.</span></p><p style='margin:0in;font-size:16px;margin-top:.05p" +
              "t;margin-right:13.75pt;margin-bottom:.0001pt;margin-left:125.6pt;text-indent:-12" +
              "0.5pt;'><span style='color:#434343;'>Memperhatikan &nbsp; : &nbsp;Kebutuhan akan" +
              " sumber daya manusia di&nbsp;</span><span style='color:#434343;'>&hellip;.</span" +
              "></p><p style='margin:0in;font-size:16px;margin-top:.4pt;'><span style='font-siz" +
              "e:17px;'>&nbsp;</span></p><p style='margin: 0.4pt 0in 0in; font-size: 16px; text" +
              "-align: center;'><span style='color:#434343;'><strong>MEMUTUSKAN</strong></span>" +
              "</p><p style='margin:0in;font-size:16px;margin-top:.4pt;'><strong><span style='f" +
              "ont-size:18px;'>&nbsp;</span></strong></p><p style='margin:0in;font-size:16px;ma" +
              "rgin-top:.05pt;margin-right:5.05pt;margin-bottom:.0001pt;margin-left:5.05pt;text" +
              "-align:justify;line-height:115%;'><span style='color:#434343;'>Mengangkat Saudar" +
              "a&nbsp;</span><span style='color:#434343;'>&hellip;.</span><span style='color:#4" +
              "34343;'>&nbsp;sebagai&nbsp;</span><span style='color:#434343;'>&hellip;.</span><" +
              "span style='color:#434343;'>, Bila mana dikemudian hari ditemukan kesalahan deng" +
              "an diterbitkannya Surat Keputusan ini, maka pihak perusahaan akan melakukan peny" +
              "esuaian ulang sebagaimana mestinya.</span></p><p style='margin:0in;font-size:16p" +
              "x;margin-top:.25pt;'><span style='font-size:27px;'>&nbsp;</span></p><p style='ma" +
              "rgin:0in;font-size:16px;margin-top:0in;margin-right:13.75pt;margin-bottom:.0001p" +
              "t;margin-left:5.05pt;'><span style='color:#434343;'>&hellip;&hellip;.., &hellip;" +
              "&hellip;.</span></p><p style='margin:0in;font-size:16px;'><span style='font-size" +
              ":13px;'>&nbsp;</span></p><p style='margin:0in;font-size:16px;margin-top:.35pt;'>" +
              "<span style='font-size:13px;'>&nbsp;</span></p><p style='margin:0in;font-size:16" +
              "px;margin-top:5.0pt;margin-right:0in;margin-bottom:.0001pt;margin-left:5.05pt;'>" +
              "<span style='color:#434343;'>&hellip;&hellip;..</span></p><p style='margin:0in;f" +
              "ont-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:.0001pt;margin-lef" +
              "t:5.05pt;'><span style='color:#434343;'>&hellip;&hellip;..</span></p><p style='m" +
              "argin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:.0001pt" +
              ";margin-left:5.05pt;'><span style='color:#434343;'>&hellip;&hellip;..</span></p>");
  }

  const sp1 = () => {
      setEditorContent("<p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.05pt;f" +
              "ont-size:21px;font-weight:bold;text-decoration:underline;text-align:center;'><br" +
              "></p><p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.0" +
              "5pt;font-size:21px;font-weight:bold;text-decoration:underline;text-align:center;" +
              "'><span style='font-size:19px;color:#434343;text-decoration:none;'>SURAT&nbsp;</" +
              "span><span style='font-size:19px;color:#434343;text-decoration:none;'>PERINGATAN" +
              "</span></p><p style='margin:0in;font-size:16px;margin-top:1.6pt;margin-right:0in" +
              ";margin-bottom:.0001pt;margin-left:5.05pt;text-align:center;'><span style='color" +
              ":#434343;'>No.&nbsp;..../</span><span style='color:#434343;'>&hellip;.</span><sp" +
              "an style='color:#434343;'>/</span><span style='color:#434343;'>&hellip;./&hellip" +
              ";.</span></p><p style='margin:0in;font-size:16px;'><span style='font-size:19px;'" +
              ">&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;backgr" +
              "ound:white;'><span style='font-size:16px;font-family:'Helvetica Neue';color:#444" +
              "444;'>Kepada Yth.<br> Saudara &hellip;.<br>Staff &hellip;. PT &hellip;.</span></" +
              "p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:white;'><sp" +
              "an style='font-size:16px;font-family:'montserrat',serif;color:#444444;'>di Tempa" +
              "t</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:w" +
              "hite;'><span style='font-size:16px;font-family:'montserrat',serif;color:#444444;" +
              "'>&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;text-" +
              "align:justify;background:white;'><span style='font-size:16px;font-family:'montse" +
              "rrat',serif;color:#444444;'>Memperhatikan surat perjanjian kerja &hellip;. terta" +
              "nggal &hellip;., dengan ini PT &hellip;. menginformasikan :</span></p><ol start=" +
              "'1' style='margin-bottom:0in;' type='1'> <li style='margin:0in;font-size:15px;co" +
              "lor:#444444;line-height:18.55pt;background:white;'><span style='font-size:15px;f" +
              "ont-family:'montserrat',serif;'>Berdasarkan hasil evaluasi pemantauan yang telah" +
              " dilakukan PT &hellip;. Kinerja Saudara &hellip;. selama bekerja sebagai &hellip" +
              ";. dinyatakan dan dinilai tidak mengacu terhadap SOP karyawan yang ditetapkan pe" +
              "rusahaan.</span></li> <li style='margin:0in;font-size:15px;color:#444444;line-he" +
              "ight:18.55pt;background:white;'><span style='font-size:15px;font-family:'montser" +
              "rat',serif;'>Saudara &hellip;.tidak dapat melaksanakan tugas dengan baik seperti" +
              " yang disepakati pada surat perjanjian kerja &hellip;..</span></li> <li style='m" +
              "argin:0in;font-size:15px;color:#444444;line-height:18.55pt;background:white;'><s" +
              "pan style='font-size:15px;font-family:'montserrat',serif;'>Oleh karenanya Saudar" +
              "a &hellip;. diberikan Teguran Tertulis.&nbsp;</span></li></ol><p style='margin:0" +
              "in;font-size:15px;margin-bottom:7.5pt;background:white;'><span style='font-size:" +
              "16px;font-family:'montserrat',serif;color:#444444;'>&nbsp;</span></p><p style='m" +
              "argin:0in;font-size:15px;margin-bottom:7.5pt;background:white;'><span style='fon" +
              "t-size:16px;font-family:'montserrat',serif;color:#444444;'>Demikian surat ini di" +
              "buat agar dilaksanakan dan disadari sebagaimana mestinya.</span></p><p style='ma" +
              "rgin:0in;font-size:16px;margin-top:.25pt;'><span style='font-size:27px;'>&nbsp;<" +
              "/span></p><p style='margin:0in;font-size:16px;margin-top:0in;margin-right:13.75p" +
              "t;margin-bottom:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip" +
              ";&hellip;.., &hellip;&hellip;.</span></p><p style='margin:0in;font-size:16px;mar" +
              "gin-left:4.5pt;'><span style='font-size:13px;'>&nbsp;</span></p><p style='margin" +
              ":0in;font-size:16px;margin-top:.35pt;margin-right:0in;margin-bottom:.0001pt;marg" +
              "in-left:4.5pt;'><span style='font-size:13px;'>&nbsp;</span></p><p style='margin:" +
              "0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:.0001pt;margi" +
              "n-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;..</span></p><p styl" +
              "e='margin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:.00" +
              "01pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;..</span><" +
              "/p><p style='margin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-" +
              "bottom:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;" +
              "..</span></p>");
  }

  const sp2 = () => {
      setEditorContent("<p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.05pt;f" +
              "ont-size:21px;font-weight:bold;text-decoration:underline;text-align:center;'><br" +
              "></p><p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.0" +
              "5pt;font-size:21px;font-weight:bold;text-decoration:underline;text-align:center;" +
              "'><span style='font-size:19px;color:#434343;text-decoration:none;'>SURAT&nbsp;</" +
              "span><span style='font-size:19px;color:#434343;text-decoration:none;'>PERINGATAN" +
              "</span></p><p style='margin:0in;font-size:16px;margin-top:1.6pt;margin-right:0in" +
              ";margin-bottom:.0001pt;margin-left:5.05pt;text-align:center;'><span style='color" +
              ":#434343;'>No.&nbsp;..../</span><span style='color:#434343;'>&hellip;.</span><sp" +
              "an style='color:#434343;'>/</span><span style='color:#434343;'>&hellip;./&hellip" +
              ";.</span></p><p style='margin:0in;font-size:16px;'><span style='font-size:19px;'" +
              ">&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;backgr" +
              "ound:white;'><span style='font-size:16px;font-family:'Helvetica Neue';color:#444" +
              "444;'>Kepada Yth.<br> Saudara &hellip;.<br>Staff &hellip;. PT &hellip;.</span></" +
              "p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:white;'><sp" +
              "an style='font-size:16px;font-family:'montserrat',serif;color:#444444;'>di Tempa" +
              "t</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:w" +
              "hite;'><span style='font-size:16px;font-family:'montserrat',serif;color:#444444;" +
              "'>&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;text-" +
              "align:justify;background:white;'><span style='font-size:16px;font-family:'montse" +
              "rrat',serif;color:#444444;'>Bersama dengan surat ini, perusahaan harus menyampai" +
              "kan surat peringatan kedua (SP-2) sebagai tindak lanjut dari surat peringatan pe" +
              "rtama (SP-1) yang sebelumnya disampaikan kepada Saudara &hellip;.. Namun, Saudar" +
              "a &hellip;. tidak kunjung memberikan respon positif atas &nbsp;surat peringatan " +
              "tersebut.&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5p" +
              "t;text-align:justify;background:white;'><span style='font-size:16px;font-family:" +
              "'montserrat',serif;color:#444444;'>Supaya Saudara &hellip;. dapat memperbaiki si" +
              "kap dan bekerja dengan profesional kembali, maka perusahaan menjatuhkan sanksi b" +
              "erdasarkan aturan yang berlaku dan disepakati, yakni :</span></p><ol start='1' s" +
              "tyle='margin-bottom:0in;' type='1'> <li style='margin:0in;font-size:15px;color:#" +
              "444444;line-height:18.55pt;background:white;'><span style='font-size:15px;font-f" +
              "amily:'montserrat',serif;'>Pemotongan gaji sebesar Rp. &hellip;. (&hellip;.) sel" +
              "ama &hellip;. bulan.</span></li> <li style='margin:0in;font-size:15px;color:#444" +
              "444;line-height:18.55pt;background:white;'><span style='font-size:15px;font-fami" +
              "ly:'montserrat',serif;'>Tidak diperkenankan untuk menggunakan inventaris perusah" +
              "aan berupa kendaraan.</span></li></ol><p style='margin:0in;font-size:15px;margin" +
              "-bottom:7.5pt;text-align:justify;background:white;'><span style='font-size:16px;" +
              "font-family:'montserrat',serif;color:#444444;'>Apabila teguran Surat Peringatan " +
              "2 ini juga tidak direspon dengan baik, maka dari itu perusahaan akan mengeluarka" +
              "n SP-3 yang berarti pemberhentian pekerjaan secara sepihak.</span></p><p style='" +
              "margin:0in;font-size:15px;margin-bottom:7.5pt;text-align:justify;background:whit" +
              "e;'><span style='font-size:16px;font-family:'montserrat',serif;color:#444444;'>D" +
              "emikian Surat Peringatan 2 ini diterbitkan supaya dapat ditaati sebagaimana haru" +
              "snya. Untuk Saudara &hellip;. diharapkan agar memperbaiki diri.</span></p><p sty" +
              "le='margin:0in;font-size:16px;margin-top:.25pt;'><span style='font-size:27px;'>&" +
              "nbsp;</span></p><p style='margin:0in;font-size:16px;margin-top:0in;margin-right:" +
              "13.75pt;margin-bottom:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&" +
              "hellip;&hellip;.., &hellip;&hellip;.</span></p><p style='margin:0in;font-size:16" +
              "px;margin-left:4.5pt;'><span style='font-size:13px;'>&nbsp;</span></p><p style='" +
              "margin:0in;font-size:16px;margin-top:.35pt;margin-right:0in;margin-bottom:.0001p" +
              "t;margin-left:4.5pt;'><span style='font-size:13px;'>&nbsp;</span></p><p style='m" +
              "argin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:.0001pt" +
              ";margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;..</span></p><" +
              "p style='margin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bott" +
              "om:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;..</" +
              "span></p><p style='margin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;m" +
              "argin-bottom:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&h" +
              "ellip;..</span></p>");
  }

  const sp3 = () => {
      setEditorContent("<p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.05pt;f" +
              "ont-size:21px;font-weight:bold;text-decoration:underline;text-align:center;'><br" +
              "></p><p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:5.0" +
              "5pt;font-size:21px;font-weight:bold;text-decoration:underline;text-align:center;" +
              "'><span style='font-size:19px;color:#434343;text-decoration:none;'>SURAT&nbsp;</" +
              "span><span style='font-size:19px;color:#434343;text-decoration:none;'>PERINGATAN" +
              "</span></p><p style='margin:0in;font-size:16px;margin-top:1.6pt;margin-right:0in" +
              ";margin-bottom:.0001pt;margin-left:5.05pt;text-align:center;'><span style='color" +
              ":#434343;'>No.&nbsp;..../</span><span style='color:#434343;'>&hellip;.</span><sp" +
              "an style='color:#434343;'>/</span><span style='color:#434343;'>&hellip;./&hellip" +
              ";.</span></p><p style='margin:0in;font-size:16px;'><span style='font-size:19px;'" +
              ">&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;backgr" +
              "ound:white;'><span style='font-size:16px;font-family:'Helvetica Neue';color:#444" +
              "444;'>Kepada Yth.<br> Saudara &hellip;.<br>Staff &hellip;. PT &hellip;.</span></" +
              "p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:white;'><sp" +
              "an style='font-size:16px;font-family:'montserrat',serif;color:#444444;'>di Tempa" +
              "t</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:w" +
              "hite;'><span style='font-size:16px;font-family:'montserrat',serif;color:#444444;" +
              "'>&nbsp;</span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;text-" +
              "align:justify;background:white;'><span style='font-size:16px;font-family:'montse" +
              "rrat',serif;color:#444444;'>Dengan ini perusahaan memberikan Surat Peringatan Ke" +
              "tiga (SP-3). Sekaligus pula disampaikan sebagai Surat Pemutusan Hubungan Kerja. " +
              "Kami mengeluarkan surat ini atas dasar ketidakdisiplinan yang telah dilakukan ol" +
              "eh Saudara &hellip;. selama bekerja.</span></p><p style='margin:0in;font-size:15" +
              "px;margin-bottom:7.5pt;text-align:justify;background:white;'><span style='font-s" +
              "ize:16px;font-family:'montserrat',serif;color:#444444;'>Kami memohon maaf karena" +
              " terpaksa menjatuhkan Pemutusan Hubungan Kerja kepada Saudara. Keputusan ini dib" +
              "uat supaya kegiatan perusahaan dapat berjalan dengan baik dan semestinya.</span>" +
              "</p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;background:white;'><" +
              "span style='font-size:16px;font-family:'montserrat',serif;color:#444444;'>Sehubu" +
              "ngan dengan ini pula, honor Saudara &hellip;. diberikan pada tanggal &hellip;..<" +
              "/span></p><p style='margin:0in;font-size:15px;margin-bottom:7.5pt;text-align:jus" +
              "tify;background:white;'><span style='font-size:16px;font-family:'montserrat',ser" +
              "if;color:#444444;'>Demikianlah Surat Peringatan Ketiga (SP-3) dibuat supaya dipe" +
              "rhatikan dengan seksama dan ditaati oleh yang bersangkutan.</span></p><p style='" +
              "margin:0in;font-size:16px;margin-top:.25pt;'><span style='font-size:27px;'>&nbsp" +
              ";</span></p><p style='margin:0in;font-size:16px;margin-top:0in;margin-right:13.7" +
              "5pt;margin-bottom:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hell" +
              "ip;&hellip;.., &hellip;&hellip;.</span></p><p style='margin:0in;font-size:16px;m" +
              "argin-left:4.5pt;'><span style='font-size:13px;'>&nbsp;</span></p><p style='marg" +
              "in:0in;font-size:16px;margin-top:.35pt;margin-right:0in;margin-bottom:.0001pt;ma" +
              "rgin-left:4.5pt;'><span style='font-size:13px;'>&nbsp;</span></p><p style='margi" +
              "n:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:.0001pt;mar" +
              "gin-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;..</span></p><p st" +
              "yle='margin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margin-bottom:." +
              "0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&hellip;..</span" +
              "></p><p style='margin:0in;font-size:16px;margin-top:5.0pt;margin-right:0in;margi" +
              "n-bottom:.0001pt;margin-left:4.5pt;'><span style='color:#434343;'>&hellip;&helli" +
              "p;..</span></p>");
  }

  return (
    <div>
    <div className="row">
    {showingTemplate ? (
      <div className="col-md-12">
        <button className="btn btn-light shadow mx-2" onClick={suratKeterangan}>Surat Keterangan</button>
        <button className="btn btn-light shadow mx-2" onClick={suratKeputusan}>Surat Keputusan</button>
        <button className="btn btn-light shadow mx-2" onClick={sp1}>SP 1</button>
        <button className="btn btn-light shadow mx-2" onClick={sp2}>SP 2</button>
        <button className="btn btn-light shadow mx-2" onClick={sp3}>SP 3</button>
      </div> ) : (<></>) }
      <div className="col-md-12 mt-3">

        <CKEditor
          ref={editorRef}
          editor={ClassicEditor}
          data={editorContent}
          onChange={handleEditorChange}
          config={{
            alignment: {
              options: [ 'left', 'center', 'right' ],
            },
          }}
        />
      </div>
    </div>
    </div>
  );
};

RichText.propTypes = {
  content: PropTypes.string,
  onContentChange: PropTypes.func.isRequired,
};

export default RichText;