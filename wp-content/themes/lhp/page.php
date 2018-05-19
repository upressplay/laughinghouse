<?php get_header(); ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<div id="headerImg" style="background-image: url(<?php if ( has_post_thumbnail() ) { the_post_thumbnail_url('header'); } ?>)">
		</div>
		<div class="pageBody">
			<?php the_content(); ?>
		</div>
		<?php $output = ""; ?>
		<?php if( have_rows('page_gallery') ): ?>
			<?php $output  .=  '<h2 class="pageSecTitle"> PRODUCTIONS </h2>'; ?>
		    <?php while( have_rows('page_gallery') ): the_row(); ?>
		       <?php
		       		
					$post_object = get_sub_field('page_object');
					if( $post_object ) {
						$post = $post_object;
						setup_postdata( $post ); 
						$link = get_permalink();
						$title = get_the_title();
						$img = get_the_post_thumbnail_url( $post_id, 'thumb' );
						$output  .=  '<a href="'. $link .'"><div class="pageThumb"><div class="pageThumbImg"><img src="'. $img .'"/></div><h3 class="pageThumbTitle">'. $title .'</h3></div></a>';
						wp_reset_postdata();
					} 
				?>
		    <?php endwhile; ?>
		<?php endif; ?>
		<?php if( have_rows('news_gallery') ): ?>
			<?php $output  .=  '<h2 class="pageSecTitle"> NEWS </h2>'; ?>
		    <?php while( have_rows('news_gallery') ): the_row(); ?>
		       <?php
					$post_object = get_sub_field('news_object');
					if( $post_object ) {
						$post = $post_object;
						setup_postdata( $post ); 
						$link = get_permalink();
						$title = get_the_title();
						$img = get_the_post_thumbnail_url( $post_id, 'thumb' );
						$output  .= '<a href="'. $link .'"><div class="pageThumb"><div class="pageThumbImg"><img src="'. $img .'"/></div><h3 class="pageThumbTitle">'. $title .'</h3></div></a>';
						wp_reset_postdata();
					} 
				?>
		    <?php endwhile; ?>
		<?php endif; ?>
		<?php echo $output; ?>

<?php endwhile; endif; ?>
<?php get_footer(); ?>