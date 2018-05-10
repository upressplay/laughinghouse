<?php get_header(); ?>
		<section id="content" role="main">
			index
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<?php get_template_part( 'entry' ); ?>yo
		<?php endwhile; endif; ?>
		<?php get_template_part( 'nav', 'below' ); ?>
		</section>
<?php get_footer(); ?>