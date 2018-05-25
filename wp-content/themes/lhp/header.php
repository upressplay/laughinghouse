<?php
$cdn = "/";
	$meta_title_default = "TVGla :: Idea Driven. People Focused.";
	$meta_title = $meta_title_default;
	$meta_desc_default = "TVGla is a digital marketing agency hell-bent on changing the landscape of our industry by setting trends, not following them. Our strategy is to engage your audience with the right message, in the right medium, at the right moment. From the desktop to the handheld, if it’s digital, we own it.";
	$meta_desc = $meta_desc_default;
	$site_url = "http://" . $_SERVER[HTTP_HOST];
	$meta_url = "http://" . $_SERVER[HTTP_HOST] . $_SERVER['REQUEST_URI'];
	$meta_img_default = $site_url . '/images/f7_avatar.jpg';
	$meta_img = $meta_img_default;
	global $segments;
	$segments = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/')); 
	$template_uri = get_template_directory_uri();
	?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/build/css/main.min.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.1/TweenMax.min.js"></script>

		<script src="<?php echo get_template_directory_uri(); ?>/build/js/main.min.js"></script>
		<link href="https://fonts.googleapis.com/css?family=Domine:400,700" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Ultra" rel="stylesheet">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
	<nav>
		<a href="/">
			<div id="navLogo">	
				<img src="<?php echo $template_uri; ?>/build/img/site_logo.jpg" alt="Laughing House Prodcutions Logo"/>
			</div>	
		</a>
		<div id="navButtons">
			<div id="navBtnHolder">
			<?php
				$menu_items = wp_get_nav_menu_items( 'Top Menu' );
				foreach ( (array) $menu_items as $key => $menu_item ) {
				    $title = $menu_item->title;
				    $url = $menu_item->url;
				    $attr_title = $menu_item->attr_title;
				    $btn_class = "navBtn";
				    //if($attr_title == $segments[0]) $btn_class = "activeBtn";
				    echo '<a href="' . $url . '"><div class="' . $btn_class . '">' . $title . '</div></a>';
				}
			?>
			</div>
			<div id="socialBtnHolder">
			<?php
				$btn_class;
				$menu_items = wp_get_nav_menu_items( 'Social Links Menu' );
				foreach ( (array) $menu_items as $key => $menu_item ) {
				    $title = $menu_item->title;
				    $url = $menu_item->url;
				    $attr_title = $menu_item->attr_title;
				    $icon_class = get_field('icon_class', $menu_item);
				    $btn_class = "socialBtn ";

				   	echo '<a href="'.$url.'" target="_blank" >
                        <div class="'.$btn_class.'">
                          <span class="'.$icon_class.'" aria-hidden="true" ></span>
                          <span class="screen-reader-text">'.$title.'</span>
                        </div>
                    </a>'; 
				}
			?>
			</div>
		</div>

		
		
		<div id="navMenuBtn" class="fa fa-bars" ></div>
      	<div id="navMenuCloseBtn" class="fa fa-times" ></div>
	</nav>
	<div id="site">
		<div id="siteHolder">