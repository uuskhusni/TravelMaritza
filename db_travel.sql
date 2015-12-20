-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 20 Des 2015 pada 13.21
-- Versi Server: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_travel`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `harga`
--

CREATE TABLE IF NOT EXISTS `harga` (
  `hargaid` int(11) NOT NULL,
  `harga` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `harga`
--

INSERT INTO `harga` (`hargaid`, `harga`) VALUES
(1, 85000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jamkeberangkatan`
--

CREATE TABLE IF NOT EXISTS `jamkeberangkatan` (
  `jamkeberangkatanid` int(11) NOT NULL,
  `jam` varchar(10) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `jamkeberangkatan`
--

INSERT INTO `jamkeberangkatan` (`jamkeberangkatanid`, `jam`) VALUES
(1, '04:00'),
(2, '07:00'),
(3, '09:00'),
(21, '11:00'),
(22, '13:00'),
(32, '15:00'),
(33, '18:00'),
(34, '20:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `shuttle`
--

CREATE TABLE IF NOT EXISTS `shuttle` (
  `shuttleid` int(20) NOT NULL,
  `nama` varchar(500) DEFAULT NULL,
  `kotaid` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `shuttle`
--

INSERT INTO `shuttle` (`shuttleid`, `nama`, `kotaid`) VALUES
(1, 'Cihampelass', 'bandung'),
(2, 'MIM', 'bandung'),
(3, 'Dipatiukur', 'bandung'),
(5, 'Blok M', 'jakarta'),
(6, 'Tebet', 'jakarta');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_tiket`
--

CREATE TABLE IF NOT EXISTS `transaksi_tiket` (
  `transaksiid` int(8) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `tanggal` int(11) DEFAULT NULL,
  `jamkeberangkatanid` int(11) DEFAULT NULL,
  `tujuanshuttleid` varchar(50) DEFAULT NULL,
  `asalshuttleid` varchar(50) DEFAULT NULL,
  `nokursi` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `nohp` varchar(100) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `shuttleid` int(11) DEFAULT NULL,
  `level` varchar(20) DEFAULT 'user',
  `isactive` int(11) DEFAULT '1'
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `nama`, `shuttleid`, `level`, `isactive`) VALUES
(3, 'adminjakarta001', 'adminjakarta001', 'Agung', 5, 'user', 1),
(1, 'admin', 'admin', 'Agung', 1, 'admin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `harga`
--
ALTER TABLE `harga`
  ADD PRIMARY KEY (`hargaid`);

--
-- Indexes for table `jamkeberangkatan`
--
ALTER TABLE `jamkeberangkatan`
  ADD PRIMARY KEY (`jamkeberangkatanid`);

--
-- Indexes for table `shuttle`
--
ALTER TABLE `shuttle`
  ADD PRIMARY KEY (`shuttleid`);

--
-- Indexes for table `transaksi_tiket`
--
ALTER TABLE `transaksi_tiket`
  ADD PRIMARY KEY (`transaksiid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `harga`
--
ALTER TABLE `harga`
  MODIFY `hargaid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jamkeberangkatan`
--
ALTER TABLE `jamkeberangkatan`
  MODIFY `jamkeberangkatanid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `transaksi_tiket`
--
ALTER TABLE `transaksi_tiket`
  MODIFY `transaksiid` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
