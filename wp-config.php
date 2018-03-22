<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'db730452206');

/** MySQL database username */
define('DB_USER', 'dbo730452206');

/** MySQL database password */
define('DB_PASSWORD', 'LaughingHouseP2018!');

/** MySQL hostname */
define('DB_HOST', 'db730452206.db.1and1.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'tr?  Ulb_#AF^D?E`63pSg !`{)xjL<RN8W4!2gS[i:ZuGlI,3bUAI7iJeuFNJi4');
define('SECURE_AUTH_KEY',  'X66IL`1JsB#!;x,aKsVq&u<v%{JJ/ScU{zMv[ZqUFkKNwsDu2H!9DN@!xYa-{rx!');
define('LOGGED_IN_KEY',    '?S dzIdZCphMTgRsBvjGBw#%bV8L.RKj)Wm)o:brs,~efr)CI4G7 )S{xo9[Y@Qs');
define('NONCE_KEY',        '6PIaTE.a84%;YH_uY Gun35)-{xRZ.e!b1&y~y>$vGBFNj7?Pi[<EpxN@Y`,;Hu?');
define('AUTH_SALT',        '.7a~WP-PF$<;,-B<{-?#,k+GKwm^>H%h=#k:9GTNip$%MfEJ8s&^Fuy{vB6G,Fbw');
define('SECURE_AUTH_SALT', '5)_?+-Po-}MgXl.5WT&~_)VjD[`LsXk5*^M7/VppAL]aDB+?YxZs$<IGmXls`Iqv');
define('LOGGED_IN_SALT',   'Zea.L_MHJyZ^ds(,j-Qg@mG~(3AS{]Y5YaBNm>^u.CF,18i}vL/r>Z+![|u)8_,}');
define('NONCE_SALT',       'yj1{EFbP`|s}y3K.EE!Bh50^ZxxQU 3S.U2XdI8KRmOqfG}xXyj_Y]m0fd2S~jbS');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
