<?php

add_image_size( 'header', 1600, 600, array( 'top', 'center' ) );
add_image_size( 'pageThumbRect', 400, 200, array( 'center', 'center' ) );
add_image_size( 'pageThumbSq', 400, 400, array( 'center', 'center' ) );
add_image_size( 'pageThumbSqSm', 200, 200, array( 'center', 'center' ) );
add_image_size( 'pageThumbTall', 400, 600, array( 'top', 'center' ) );

add_action( 'after_setup_theme', 'lhp_setup' );

function lhp_setup()
{
	load_theme_textdomain( 'lhp', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );

	global $content_width;

	if ( ! isset( $content_width ) ) $content_width = 640;
	register_nav_menus(
		array( 'main-menu' => __( 'Main Menu', 'lhp' ) )
	);
}

add_action( 'wp_enqueue_scripts', 'lhp_load_scripts' );

function lhp_load_scripts()
{
	wp_enqueue_script( 'jquery' );
}

add_action( 'comment_form_before', 'lhp_enqueue_comment_reply_script' );

function lhp_enqueue_comment_reply_script()
{
	if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}

add_filter( 'the_title', 'lhp_title' );

function lhp_title( $title ) {
	if ( $title == '' ) {
	return '&rarr;';
	} else {
	return $title;
	}
}
add_filter( 'wp_title', 'lhp_filter_wp_title' );

function lhp_filter_wp_title( $title )
{
	return $title . esc_attr( get_bloginfo( 'name' ) );
}

add_action( 'widgets_init', 'lhp_widgets_init' );

function lhp_widgets_init()

{
register_sidebar( array (
	'name' => __( 'Sidebar Widget Area', 'blankslate' ),
	'id' => 'primary-widget-area',
	'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
	'after_widget' => "</li>",
	'before_title' => '<h3 class="widget-title">',
	'after_title' => '</h3>',
	) );
}
function lhp_custom_pings( $comment )

{

$GLOBALS['comment'] = $comment;
?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
<?php 
}

add_filter( 'get_comments_number', 'lhp_comments_number' );

function lhp_comments_number( $count )
	{
	if ( !is_admin() ) {
	global $id;
	$comments_by_type = &separate_comments( get_comments( 'status=approve&post_id=' . $id ) );
	return count( $comments_by_type['comment'] );
	} else {
	return $count;
	}
}

add_action('get_header', 'remove_admin_login_header');

function remove_admin_login_header() {
	remove_action('wp_head', '_admin_bar_bump_cb');
}

function empty_content($str) {
    return trim(str_replace('&nbsp;','',strip_tags($str,'<img>'))) == '';
}
