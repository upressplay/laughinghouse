<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width" />
		<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/build/css/main.min.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.1/TweenMax.min.js"></script>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
	<nav>
		<div id="navLogo">	
			<img src="<?php echo get_template_directory_uri(); ?>/build/img/site_logo.jpg" alt="Laughing House Prodcutions Logo"/>
		</div>	
		<?php wp_nav_menu( array( 
			'theme_location' => 'main-menu',
			'container' => false,
			'items_wrap' => '<div id="navButtons" >%3$s</div>',
			'before' => '<div class="navButton">',
			'after' => '</div>'
			) ); ?>
	</nav>
	<div id="wrapper">
		<div id="container">